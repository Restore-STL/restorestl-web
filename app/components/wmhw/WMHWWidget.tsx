'use client';

/**
 * WMHW GA4 Events (via GTM dataLayer)
 *
 * Events pushed to window.dataLayer for GTM pickup:
 * - wmhw_address_submitted: Address entered on screen 1
 * - wmhw_screen2_viewed: Condition screen loaded after address entry
 * - wmhw_condition_selected: User selected property condition
 * - wmhw_report_clicked: "Email My Free Report" button clicked
 * - wmhw_lead_submitted: Lead successfully submitted via API
 * - wmhw_book_click: User clicked "Book a Call with Kevin"
 * - wmhw_call_click: User clicked phone call link
 *
 * GTM Container: GTM-M7DX6C4X
 * GA4 Property: G-KMKSDK02X9
 */

import { useState, useCallback, useRef, useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    google: typeof google;
  }
}

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://restorestl-backend-327709678368.us-central1.run.app';
const API_KEY = process.env.NEXT_PUBLIC_RESTORESTL || '';
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Condition tiers (from optimized WMHW)
const CONDITION_TIERS = [
  { label: 'Needs Major Work', tierPercent: 0.0, desc: 'Cash-buyer range. Accounts for significant structural, roof, or system overhauls.' },
  { label: 'Needs TLC', tierPercent: 0.25, desc: 'Investor offer range. Deducts for deferred maintenance (paint, flooring, minor repairs).' },
  { label: 'Average', tierPercent: 0.50, desc: 'Standard market value. Assumes a solid home that is stylistically dated (older cabinets, carpet).' },
  { label: 'Updated', tierPercent: 0.75, desc: 'Strong value. Home is modern but may lack brand-new premium finishes.' },
  { label: 'Pristine', tierPercent: 1.0, desc: 'Top of market value. Requires showroom condition (new roof, modern kitchen, hardwood).' },
];

type AddressInput = {
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
};

type ValuationResult = {
  estimated_value: number | null;
  value_range_low?: number | null;
  value_range_high?: number | null;
  property_details?: {
    beds?: number;
    baths?: number;
    sqft?: number;
    year_built?: number;
    lot_size?: number;
    property_type?: string;
  } | null;
  rent_estimate?: {
    rent?: number;
    rent_low?: number;
    rent_high?: number;
  } | null;
  comparables?: Array<{
    address: string;
    price: number;
    sqft?: number;
    beds?: number;
    baths?: number;
    distance: number;
    days_on_market?: number;
  }>;
};

export default function WMHWWidget() {
  const [step, setStep] = useState<'address' | 'condition' | 'result'>('address');
  const [address, setAddress] = useState<AddressInput>({
    street_address: '', city: '', state: '', zip_code: ''
  });
  const [addressDisplay, setAddressDisplay] = useState('');
  const [autocompleteReady, setAutocompleteReady] = useState(false);
  const [showManualFields, setShowManualFields] = useState(false);
  const [conditionIndex, setConditionIndex] = useState<number | null>(null);
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [selectedPulse, setSelectedPulse] = useState<number | null>(null);
  const [nudgeCards, setNudgeCards] = useState(false);

  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const conditionCardsRef = useRef<HTMLDivElement>(null);

  // Initialize classic Google Places Autocomplete on a standard <input>
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY) {
      setShowManualFields(true);
      return;
    }

    let cancelled = false;

    function loadGoogleMapsScript(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (window.google?.maps?.places) {
          resolve();
          return;
        }

        const existing = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existing) {
          if (window.google?.maps?.places) {
            resolve();
            return;
          }
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error('Google Maps script failed')));
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google Maps script failed to load'));
        document.head.appendChild(script);
      });
    }

    async function initAutocomplete() {
      await loadGoogleMapsScript();

      if (cancelled || !autocompleteInputRef.current) return;

      try {
        const ac = new window.google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          {
            componentRestrictions: { country: 'us' },
            types: ['address'],
            fields: ['address_components', 'formatted_address'],
          }
        );

        autocompleteRef.current = ac;

        ac.addListener('place_changed', () => {
          const place = ac.getPlace();
          if (!place.address_components) return;

          let streetNumber = '';
          let route = '';
          let city = '';
          let state = '';
          let zip = '';

          for (const comp of place.address_components) {
            const types = comp.types;
            if (types.includes('street_number')) streetNumber = comp.long_name;
            if (types.includes('route')) route = comp.short_name;
            if (types.includes('locality')) city = comp.long_name;
            if (types.includes('administrative_area_level_1')) state = comp.short_name;
            if (types.includes('postal_code')) zip = comp.long_name;
          }

          if (!route || !city || !state) return;

          const parsed: AddressInput = {
            street_address: streetNumber ? `${streetNumber} ${route}` : route,
            city,
            state,
            zip_code: zip,
          };

          setAddress(parsed);
          setAddressDisplay(place.formatted_address || '');
          setError(undefined);
        });

        setAutocompleteReady(true);
      } catch (err) {
        console.error('Failed to init Google Places Autocomplete', err);
        if (!cancelled) setShowManualFields(true);
      }
    }

    initAutocomplete().catch(() => {
      if (!cancelled) setShowManualFields(true);
    });

    return () => {
      cancelled = true;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  // Scroll widget into view on step transitions
  useEffect(() => {
    if (step === 'condition' || step === 'result') {
      const timeout = setTimeout(() => {
        document.getElementById('instant-offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  // Fire wmhw_screen2_viewed when condition screen loads
  useEffect(() => {
    if (step === 'condition') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'wmhw_screen2_viewed',
        address_zip: address.zip_code,
      });
    }
  }, [step, address.zip_code]);

  // Attention nudge: if user scrolls past condition cards without selecting
  useEffect(() => {
    if (step !== 'condition' || conditionIndex !== null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cards scrolled out of view without selection — nudge
        if (!entry.isIntersecting) {
          setNudgeCards(true);
          // Scroll back to cards
          conditionCardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Remove nudge after animation
          setTimeout(() => setNudgeCards(false), 1500);
        }
      },
      { threshold: 0.3 }
    );

    if (conditionCardsRef.current) {
      observer.observe(conditionCardsRef.current);
    }

    return () => observer.disconnect();
  }, [step, conditionIndex]);

  const fetchValuation = useCallback(async (addressInput: AddressInput) => {
    const addressStr = `${addressInput.street_address}, ${addressInput.city}, ${addressInput.state} ${addressInput.zip_code}`;

    const resp = await fetch(`${API_BASE_URL}/api/valuation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({ address: addressStr })
    });

    if (resp.status === 401) throw new Error('Authentication required. Please contact support.');
    if (resp.status === 403) throw new Error('Access denied. Please contact support.');
    if (resp.status === 429) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.message || 'Too many requests. Please try again later.');
    }
    if (!resp.ok) throw new Error(`Unable to get estimate (${resp.status})`);

    return await resp.json() as ValuationResult;
  }, []);

  async function onAddressSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate we have an address (either from autocomplete or manual)
    if (!address.street_address || !address.city || !address.state) {
      if (autocompleteReady && !showManualFields) {
        setError('Please select an address from the dropdown suggestions.');
        return;
      }
      setError('Please enter a complete address.');
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setLoadingMessage('Searching comparable sales...');

    try {
      setTimeout(() => setLoadingMessage('Analyzing market trends...'), 800);
      setTimeout(() => setLoadingMessage('Calculating property value...'), 1600);

      const v = await fetchValuation(address);
      setValuation(v);

      const fullAddress = `${address.street_address}, ${address.city}, ${address.state} ${address.zip_code}`;
      sessionStorage.setItem('property_address', fullAddress);
      if (v?.estimated_value) sessionStorage.setItem('estimated_value', String(v.estimated_value));
      if (v?.property_details) sessionStorage.setItem('property_details', JSON.stringify(v.property_details));

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'wmhw_address_submitted',
        property_address: fullAddress,
        estimated_value: v.estimated_value || null,
      });

      setStep('condition');
    } catch (err) {
      console.error('valuation failed', err);
      setError('Unable to get estimate. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }

  function onConditionSelect(index: number) {
    setConditionIndex(index);
    setSelectedPulse(index);
    setNudgeCards(false);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'wmhw_condition_selected',
      condition_value: CONDITION_TIERS[index].label,
    });

    // Auto-advance after pulse animation
    setTimeout(() => {
      setSelectedPulse(null);
      setStep('result');
    }, 500);
  }

  async function onContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);

    const formData = new FormData(e.currentTarget);
    const nameRaw = (formData.get('name') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';

    if (!nameRaw) {
      setError('Please provide your name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!phone) {
      setError('Please provide your phone number.');
      return;
    }

    // Fire report clicked event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'wmhw_report_clicked',
      condition_value: conditionIndex !== null ? CONDITION_TIERS[conditionIndex].label : null,
      address_zip: address.zip_code,
    });

    // Split name into first/last
    const nameParts = nameRaw.split(/\s+/);
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || first_name;

    const selectedCondition = conditionIndex !== null ? CONDITION_TIERS[conditionIndex].label : 'Average';
    const tierPct = conditionIndex !== null ? CONDITION_TIERS[conditionIndex].tierPercent : 0.50;
    const adjustedVal = valuation?.value_range_low != null && valuation?.value_range_high != null
      ? valuation.value_range_low + (valuation.value_range_high - valuation.value_range_low) * tierPct
      : null;

    const pd = valuation?.property_details;

    setIsSubmitting(true);
    try {
      const fullAddress = `${address.street_address}, ${address.city}, ${address.state} ${address.zip_code}`;

      const resp = await fetch(`${API_BASE_URL}/api/leads/wmhw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone,
          address: fullAddress,
          condition: selectedCondition,
          estimated_value: valuation?.estimated_value ?? null,
          adjusted_value: adjustedVal ? Math.round(adjustedVal) : null,
          value_range_low: valuation?.value_range_low ?? null,
          value_range_high: valuation?.value_range_high ?? null,
          beds: pd?.beds ?? null,
          baths: pd?.baths ?? null,
          sqft: pd?.sqft ?? null,
          property_details: valuation?.property_details ?? null,
          comparables: valuation?.comparables ?? null,
          rent_estimate: valuation?.rent_estimate ?? null,
          timeline: null,
          path_selected: null,
          reason_for_selling: null,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.message || `Failed (${resp.status})`);
      }

      // Store for /book page prefill
      sessionStorage.setItem('property_condition', selectedCondition);
      sessionStorage.setItem('adjusted_value', adjustedVal ? String(Math.round(adjustedVal)) : '');
      sessionStorage.setItem('user_name', nameRaw);
      sessionStorage.setItem('user_email', email);
      sessionStorage.setItem('user_phone', phone);
      sessionStorage.setItem('wmhw_completed', 'true');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'wmhw_lead_submitted',
        property_address: fullAddress,
        property_condition: selectedCondition,
        estimated_value: valuation?.estimated_value || null,
        adjusted_value: adjustedVal ? Math.round(adjustedVal) : null,
        timeline: null,
        path_selected: null,
        reason_for_selling: null,
      });

      setContactSubmitted(true);
    } catch (err) {
      console.error('WMHW lead submission failed', err);
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const pd = valuation?.property_details;
  const rent = valuation?.rent_estimate;
  const comps = valuation?.comparables;
  const rangeLow = valuation?.value_range_low ?? null;
  const rangeHigh = valuation?.value_range_high ?? null;
  const tierPct = conditionIndex !== null ? CONDITION_TIERS[conditionIndex].tierPercent : null;
  const adjustedValue = rangeLow != null && rangeHigh != null && tierPct !== null
    ? rangeLow + (rangeHigh - rangeLow) * tierPct
    : null;

  // Property type display label
  const propertyTypeLabel = pd?.property_type
    ? pd.property_type.replace(/([A-Z])/g, ' $1').trim()
    : null;

  return (
    <section id="instant-offer" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[var(--brand-yellow)]">
            {/* Address Step */}
            {step === 'address' && (
              <form onSubmit={onAddressSubmit} className="space-y-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
                  What&apos;s Your House Worth?
                </h2>
                <p className="text-[var(--text-secondary)] text-center mb-6">
                  No login. No callbacks. Just real numbers.
                </p>

                {/* Google Places Autocomplete Field */}
                {!showManualFields && (
                  <div className="relative">
                    <div className="flex items-center bg-white border border-[var(--border-gray)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--brand-yellow)] focus-within:border-transparent transition-all">
                      <div className="pl-4 text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        ref={autocompleteInputRef}
                        type="text"
                        placeholder="Enter your property address"
                        className="flex-1 min-w-0 bg-white text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] px-3 py-3 border-none outline-none rounded-r-lg"
                        autoComplete="off"
                      />
                    </div>
                    {address.street_address && (
                      <div className="mt-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{address.street_address}, {address.city}, {address.state} {address.zip_code}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Manual Address Fields (fallback) */}
                {showManualFields && (
                  <div className="space-y-3">
                    <input
                      className="w-full px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                      placeholder="Street address"
                      autoComplete="street-address"
                      value={address.street_address}
                      onChange={e => setAddress(a => ({ ...a, street_address: e.target.value }))}
                      required
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                        placeholder="City"
                        autoComplete="address-level2"
                        value={address.city}
                        onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                        required
                      />
                      <input
                        className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                        placeholder="State"
                        autoComplete="address-level1"
                        value={address.state}
                        onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                        maxLength={2}
                        required
                      />
                      <input
                        className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                        placeholder="ZIP"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        value={address.zip_code}
                        onChange={e => setAddress(a => ({ ...a, zip_code: e.target.value }))}
                        maxLength={5}
                        required
                      />
                    </div>
                    {autocompleteReady && (
                      <button
                        type="button"
                        onClick={() => setShowManualFields(false)}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
                      >
                        &larr; Use address search instead
                      </button>
                    )}
                  </div>
                )}

                <button
                  className="w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-8 py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {loadingMessage || 'Analyzing...'}
                    </span>
                  ) : (
                    'See My Home\u2019s Value'
                  )}
                </button>

                {error && (
                  <p className="text-red-600 text-center text-sm">{error}</p>
                )}

                {/* Manual entry toggle */}
                {!showManualFields && (
                  <button
                    type="button"
                    onClick={() => setShowManualFields(true)}
                    className="w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors text-center"
                  >
                    Enter address manually instead
                  </button>
                )}
              </form>
            )}

            {/* Condition Selection Step */}
            {step === 'condition' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    One more thing &mdash; how&apos;s the property&apos;s condition?
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    This directly affects your estimate. A home needing a new roof gets a very different number than one that&apos;s move-in ready.
                  </p>
                </div>

                <div ref={conditionCardsRef} className="space-y-3">
                  {CONDITION_TIERS.map((tier, i) => {
                    const isSelected = conditionIndex === i;
                    const isPulsing = selectedPulse === i;
                    const isNudging = nudgeCards && conditionIndex === null;

                    return (
                      <button
                        key={tier.label}
                        type="button"
                        onClick={() => onConditionSelect(i)}
                        className={`
                          w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                          min-h-[56px] cursor-pointer
                          ${isSelected
                            ? 'border-[var(--brand-yellow)] bg-yellow-50'
                            : 'border-[var(--border-gray)] bg-white hover:border-gray-300 hover:bg-gray-50'
                          }
                          ${isPulsing ? 'animate-[pulse-glow_0.5s_ease-in-out]' : ''}
                          ${isNudging ? 'animate-[nudge_0.4s_ease-in-out]' : ''}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          {/* Selection indicator */}
                          <div className={`
                            flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5
                            flex items-center justify-center transition-all
                            ${isSelected
                              ? 'border-[var(--brand-yellow)] bg-[var(--brand-yellow)]'
                              : 'border-gray-300'
                            }
                          `}>
                            {isSelected && (
                              <svg className="w-4 h-4 text-[var(--charcoal-deep)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className={`font-semibold ${isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                                {tier.label}
                              </p>
                              {valuation?.value_range_low != null && valuation?.value_range_high != null && (
                                <p className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
                                  ~{formatCurrency(Math.round(valuation.value_range_low + (valuation.value_range_high - valuation.value_range_low) * tier.tierPercent))}
                                </p>
                              )}
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                              {tier.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Address context */}
                <p className="text-xs text-[var(--text-secondary)] text-center">
                  Estimating for {address.street_address}, {address.city}
                </p>
              </div>
            )}

            {/* Result Step — Full enrichment display */}
            {step === 'result' && valuation && (
              <div className="space-y-6">
                {/* 1. Property Header */}
                <div className="bg-[var(--charcoal-deep)] text-white rounded-xl p-5">
                  <h2 className="text-xl font-bold">
                    {address.street_address}
                  </h2>
                  <p className="text-sm text-gray-300">
                    {address.city}, {address.state} {address.zip_code}
                  </p>
                  {(propertyTypeLabel || pd?.year_built) && (
                    <p className="text-sm text-gray-400 mt-1">
                      {[propertyTypeLabel, pd?.year_built ? `Built ${pd.year_built}` : null].filter(Boolean).join(' \u00b7 ')}
                    </p>
                  )}
                </div>

                {/* 2. Condition Badge + Change Link */}
                {conditionIndex !== null && (
                  <div className="flex items-center justify-between bg-[var(--background-gray)] px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[var(--text-secondary)]">Condition:</span>
                      <span className="inline-flex items-center gap-1.5 bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] text-sm font-semibold px-3 py-1 rounded-full">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {CONDITION_TIERS[conditionIndex].label}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setConditionIndex(null);
                        setStep('condition');
                      }}
                      className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
                    >
                      Change
                    </button>
                  </div>
                )}

                {/* 3. Property Stats Row */}
                {(pd?.beds || pd?.baths || pd?.sqft || rent?.rent) && (
                  <div className="flex flex-wrap gap-3 justify-center">
                    {pd?.beds != null && (
                      <div className="bg-[var(--background-gray)] px-4 py-2 rounded-full text-sm font-medium text-[var(--text-primary)]">
                        {pd.beds} Beds
                      </div>
                    )}
                    {pd?.baths != null && (
                      <div className="bg-[var(--background-gray)] px-4 py-2 rounded-full text-sm font-medium text-[var(--text-primary)]">
                        {pd.baths} Baths
                      </div>
                    )}
                    {pd?.sqft != null && (
                      <div className="bg-[var(--background-gray)] px-4 py-2 rounded-full text-sm font-medium text-[var(--text-primary)]">
                        {new Intl.NumberFormat().format(pd.sqft)} Sq Ft
                      </div>
                    )}
                    {rent?.rent != null && (
                      <div className="bg-[var(--background-gray)] px-4 py-2 rounded-full text-sm font-medium text-[var(--text-primary)]">
                        {formatCurrency(rent.rent)}/mo
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Adjusted Value Display */}
                {adjustedValue != null && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-[var(--brand-yellow)] rounded-xl p-6 text-center">
                    <p className="text-sm text-[var(--text-secondary)] uppercase tracking-wide font-medium mb-2">
                      Adjusted Estimate
                    </p>
                    <p className="text-4xl font-bold text-[var(--text-primary)] mb-1">
                      {formatCurrency(adjustedValue)}
                    </p>
                    {rangeLow != null && rangeHigh != null && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-base font-medium text-[var(--text-primary)]">
                          <span>{formatCurrency(rangeLow)}</span>
                          <span>{formatCurrency(rangeHigh)}</span>
                        </div>
                        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--brand-yellow)] to-amber-400 rounded-full"
                            style={{
                              width: rangeHigh > rangeLow
                                ? `${((adjustedValue - rangeLow) / (rangeHigh - rangeLow)) * 100}%`
                                : '50%',
                            }}
                          />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[var(--brand-yellow)] border-2 border-white rounded-full shadow-md"
                            style={{
                              left: rangeHigh > rangeLow
                                ? `clamp(0%, ${((adjustedValue - rangeLow) / (rangeHigh - rangeLow)) * 100}%, calc(100% - 20px))`
                                : '50%',
                            }}
                          />
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Based on {conditionIndex !== null ? CONDITION_TIERS[conditionIndex].label.toLowerCase() : ''} condition
                        </p>
                      </div>
                    )}
                    {!(rangeLow != null && rangeHigh != null) && (
                      <p className="text-sm text-[var(--text-secondary)]">
                        Based on {conditionIndex !== null ? CONDITION_TIERS[conditionIndex].label.toLowerCase() : ''} condition
                      </p>
                    )}
                  </div>
                )}

                {/* 5. Comparable Sales */}
                {comps && comps.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--text-primary)]">Recent comparable sales nearby</p>
                    <div className="space-y-2">
                      {comps.map((comp, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-[var(--border-gray)] rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{comp.address}</p>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {[
                                comp.beds != null ? `${comp.beds}bd` : null,
                                comp.baths != null ? `${comp.baths}ba` : null,
                                comp.sqft != null ? `${new Intl.NumberFormat().format(comp.sqft)} sqft` : null,
                              ].filter(Boolean).join(' \u00b7 ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-[var(--text-primary)]">{formatCurrency(comp.price)}</p>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {comp.distance} mi{comp.days_on_market != null ? ` \u00b7 ${comp.days_on_market} DOM` : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {comps.length < 3 && (
                      <p className="text-xs text-[var(--text-secondary)] text-center italic">
                        Additional comparable sales will be included in your full report.
                      </p>
                    )}
                  </div>
                )}

                {/* 6. Rent Estimate Callout */}
                {rent?.rent_low && rent?.rent_high && (
                  <div className="bg-[var(--background-gray)] p-4 rounded-lg flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-[var(--text-secondary)]">
                      This property could rent for {formatCurrency(rent.rent_low)} &ndash; {formatCurrency(rent.rent_high)}/mo based on nearby rentals
                    </p>
                  </div>
                )}

                {/* 7. CTA Section */}
                <div className="space-y-3 pt-2">
                  <a
                    href="/book"
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({ event: 'wmhw_book_click' });
                    }}
                    className="block w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] text-center px-6 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
                  >
                    Book a Call with Kevin
                  </a>
                  <a
                    href="tel:+13147363311"
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({ event: 'wmhw_call_click' });
                    }}
                    className="flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">Call or text Kevin: (314) 736-3311</span>
                  </a>
                </div>

                {/* 8. Optional Contact Capture */}
                <div className="border-t border-[var(--border-gray)] pt-6">
                  {!contactSubmitted ? (
                    <form onSubmit={onContactSubmit} className="space-y-3">
                      <p className="text-sm text-[var(--text-secondary)] text-center">
                        Enter your info to receive your free property analysis
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <input
                          name="name"
                          autoComplete="name"
                          className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Your name"
                          required
                        />
                        <input
                          name="email"
                          autoComplete="email"
                          type="email"
                          className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Email — we'll send your report here"
                          required
                        />
                        <input
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          type="tel"
                          className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all text-sm"
                          placeholder="Phone number"
                          required
                        />
                      </div>
                      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[var(--charcoal-deep)] hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                      >
                        {isSubmitting ? 'Sending...' : 'Email My Free Report'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-sm text-green-700 font-medium">
                        Check your inbox — your analysis is on the way.
                      </p>
                    </div>
                  )}
                </div>

                {/* 9. Privacy Note */}
                <p className="text-xs text-[var(--text-secondary)] text-center">
                  Your information stays with us. Period. We never sell leads.
                </p>

                {/* Try Different Address */}
                <button
                  onClick={() => {
                    setStep('address');
                    setAddress({ street_address: '', city: '', state: '', zip_code: '' });
                    setAddressDisplay('');
                    setValuation(null);
                    setConditionIndex(null);
                    setContactSubmitted(false);
                  }}
                  className="w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors text-center"
                >
                  &larr; Try Different Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe animations for condition cards */}
      <style jsx>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(255, 194, 0, 0.5); }
          50% { box-shadow: 0 0 0 8px rgba(255, 194, 0, 0.2); }
          100% { box-shadow: 0 0 0 0 rgba(255, 194, 0, 0); }
        }
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
}
