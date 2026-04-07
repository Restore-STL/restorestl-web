'use client';

import { useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// API config
// ---------------------------------------------------------------------------
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://restorestl-backend-327709678368.us-central1.run.app';
const API_KEY = process.env.NEXT_PUBLIC_RESTORESTL || '';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STEPS = ['About You', 'Lending Background', 'Lending Preferences', 'Logistics', 'Final Details'] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Errors = Record<string, string>;

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  relationshipSource: string;
  referralName: string;
  lendingExperience: string;
  numLoansFunded: string;
  hasActiveLoans: string;
  activeLoanCount: string;
  loanAmountMin: string;
  loanAmountMax: string;
  preferredTerms: string[];
  propertyTypes: string[];
  geoPreference: string;
  fundingSpeed: string;
  requiresAppraisal: string;
  lendingEntityType: string;
  usesServicer: string;
  isAccredited: string;
  readyNow: string;
  additionalNotes: string;
}

const INITIAL_FORM: FormData = {
  name: '', company: '', email: '', phone: '',
  relationshipSource: '', referralName: '',
  lendingExperience: '', numLoansFunded: '',
  hasActiveLoans: '', activeLoanCount: '',
  loanAmountMin: '', loanAmountMax: '',
  preferredTerms: [], propertyTypes: [], geoPreference: '',
  fundingSpeed: '', requiresAppraisal: '',
  lendingEntityType: '', usesServicer: '',
  isAccredited: '', readyNow: '', additionalNotes: '',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function CapitalPartnerPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [whyOpen, setWhyOpen] = useState<Record<string, boolean>>({});

  // --- helpers ---
  const sf = useCallback((key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const toggleChip = useCallback((key: keyof FormData, value: string) => {
    setForm(prev => {
      const arr = [...(prev[key] as string[])];
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1); else arr.push(value);
      return { ...prev, [key]: arr };
    });
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const selRadio = useCallback((key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const toggleWhy = useCallback((id: string) => {
    setWhyOpen(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // --- validation ---
  const validate = useCallback((): boolean => {
    const e: Errors = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Full name is required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.phone.trim()) e.phone = 'Phone is required';
      if (!form.relationshipSource) e.relationshipSource = 'Please select one';
      if (form.relationshipSource === 'Referral' && !form.referralName.trim()) e.referralName = 'Please enter the referral name';
    }
    if (step === 1) {
      if (!form.lendingExperience) e.lendingExperience = 'Please select one';
      if (!form.numLoansFunded) e.numLoansFunded = 'Please select one';
      if (!form.hasActiveLoans) e.hasActiveLoans = 'Please select one';
      if (form.hasActiveLoans === 'yes' && !form.activeLoanCount.trim()) e.activeLoanCount = 'Please enter a number';
    }
    if (step === 2) {
      if (!form.loanAmountMin.trim() || !form.loanAmountMax.trim()) e.loanAmount = 'Both min and max are required';
      if (!form.preferredTerms.length) e.preferredTerms = 'Select at least one';
      if (!form.propertyTypes.length) e.propertyTypes = 'Select at least one';
      if (!form.geoPreference) e.geoPreference = 'Please select one';
    }
    if (step === 3) {
      if (!form.fundingSpeed) e.fundingSpeed = 'Please select one';
      if (!form.requiresAppraisal) e.requiresAppraisal = 'Please select one';
      if (!form.lendingEntityType) e.lendingEntityType = 'Please select one';
      if (!form.usesServicer) e.usesServicer = 'Please select one';
    }
    if (step === 4) {
      if (!form.isAccredited) e.isAccredited = 'Please select one';
      if (!form.readyNow) e.readyNow = 'Please select one';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, form]);

  // --- navigation ---
  const goNext = useCallback(async () => {
    if (!validate()) return;
    if (step < 4) {
      setStep(s => s + 1);
      window.scrollTo(0, 0);
      return;
    }

    // Step 4 — submit
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const relationshipSource = form.relationshipSource === 'Referral'
        ? `Referral from ${form.referralName}`
        : form.relationshipSource;

      const payload = {
        name: form.name,
        company: form.company || null,
        email: form.email,
        phone: form.phone,
        relationship_source: relationshipSource,
        lending_experience: form.lendingExperience,
        num_loans_funded: form.numLoansFunded,
        has_active_loans: form.hasActiveLoans === 'yes',
        active_loan_count: form.hasActiveLoans === 'yes' ? parseInt(form.activeLoanCount) || 0 : 0,
        loan_amount_min: Number(form.loanAmountMin) || 0,
        loan_amount_max: Number(form.loanAmountMax) || 0,
        preferred_terms: form.preferredTerms,
        property_types: form.propertyTypes,
        geo_preference: form.geoPreference,
        funding_speed: form.fundingSpeed,
        requires_appraisal: form.requiresAppraisal,
        lending_entity_type: form.lendingEntityType,
        uses_servicer: form.usesServicer === 'yes',
        is_accredited: form.isAccredited,
        ready_now: form.readyNow,
        additional_notes: form.additionalNotes,
      };

      const res = await fetch(`${API_BASE_URL}/api/capital-partners/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setSubmitError('Something went wrong — please try again or call Kevin at (314) 736-3311');
    } finally {
      setIsSubmitting(false);
    }
  }, [step, form, validate]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep(s => s - 1);
    window.scrollTo(0, 0);
  }, []);

  // --- reusable field renderers ---
  const inputField = (id: keyof FormData, label: string, type: string, placeholder: string, required: boolean) => (
    <div>
      <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
        {label}{required && <span className="text-[#c0392b] ml-[3px]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form[id] as string) || ''}
        onChange={e => sf(id, e.target.value)}
        className={`w-full px-[13px] py-[10px] text-sm text-[#1a2e28] bg-white border-[1.5px] rounded-lg outline-none transition-colors focus:border-[#0a8754] font-[family-name:var(--font-body)] ${errors[id] ? 'border-[#c0392b]' : 'border-[#e2e8da]'}`}
      />
      {errors[id] && <div className="mt-[5px] text-[12.5px] text-[#c0392b]">{errors[id]}</div>}
    </div>
  );

  const dollarField = (id: keyof FormData, label: string, placeholder: string, required: boolean) => (
    <div>
      <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
        {label}{required && <span className="text-[#c0392b] ml-[3px]">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-sm text-[#90a4ae]">$</span>
        <input
          type="number"
          placeholder={placeholder}
          value={(form[id] as string) || ''}
          onChange={e => sf(id, e.target.value)}
          className={`w-full pl-[28px] pr-[13px] py-[10px] text-sm text-[#1a2e28] bg-white border-[1.5px] rounded-lg outline-none transition-colors focus:border-[#0a8754] font-[family-name:var(--font-body)] ${errors.loanAmount ? 'border-[#c0392b]' : 'border-[#e2e8da]'}`}
        />
      </div>
    </div>
  );

  const selectField = (id: keyof FormData, label: string, items: string[], required: boolean, placeholder = 'Select one') => (
    <div>
      <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
        {label}{required && <span className="text-[#c0392b] ml-[3px]">*</span>}
      </label>
      <select
        value={(form[id] as string) || ''}
        onChange={e => sf(id, e.target.value)}
        className={`w-full px-[13px] py-[10px] text-sm bg-white border-[1.5px] rounded-lg outline-none cursor-pointer transition-colors focus:border-[#0a8754] font-[family-name:var(--font-body)] ${form[id] ? 'text-[#1a2e28]' : 'text-[#90a4ae]'} ${errors[id] ? 'border-[#c0392b]' : 'border-[#e2e8da]'}`}
      >
        <option value="">{placeholder}</option>
        {items.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
      {errors[id] && <div className="mt-[5px] text-[12.5px] text-[#c0392b]">{errors[id]}</div>}
    </div>
  );

  const chipGroup = (id: keyof FormData, label: string, items: string[], required: boolean) => (
    <div>
      <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
        {label}{required && <span className="text-[#c0392b] ml-[3px]">*</span>}
      </label>
      <div className="flex flex-wrap gap-2 mt-[2px]">
        {items.map(item => {
          const selected = (form[id] as string[]).includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggleChip(id, item)}
              className={`px-[18px] py-[9px] rounded-[22px] text-[13.5px] cursor-pointer transition-all font-[family-name:var(--font-body)] ${
                selected
                  ? 'border-2 border-[#0a8754] bg-[#0a8754] text-white font-semibold'
                  : 'border-[1.5px] border-[#cfd8dc] bg-white text-[#4a5e56] font-normal'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      {errors[id] && <div className="mt-[5px] text-[12.5px] text-[#c0392b]">{errors[id]}</div>}
    </div>
  );

  const radioGroup = (id: keyof FormData, label: string, items: { v: string; l: string }[], required: boolean) => (
    <div>
      <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
        {label}{required && <span className="text-[#c0392b] ml-[3px]">*</span>}
      </label>
      <div className="flex flex-col gap-[10px]">
        {items.map(({ v, l }) => {
          const on = form[id] === v;
          return (
            <button key={v} type="button" onClick={() => selRadio(id, v)} className="flex items-center gap-[10px] cursor-pointer text-sm text-[#4a5e56] text-left">
              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${on ? 'border-2 border-[#0a8754] bg-[#0a8754]' : 'border-2 border-[#cfd8dc] bg-white'}`}>
                {on && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span>{l}</span>
            </button>
          );
        })}
      </div>
      {errors[id] && <div className="mt-[5px] text-[12.5px] text-[#c0392b]">{errors[id]}</div>}
    </div>
  );

  const whyBlock = (id: string, text: string) => (
    <div>
      <button type="button" onClick={() => toggleWhy(id)} className="flex items-center gap-[6px] mt-[10px] p-0 bg-transparent border-none cursor-pointer text-[13px] text-[#7c8a96] font-[family-name:var(--font-body)]">
        <span className="inline-flex items-center justify-center w-[17px] h-[17px] rounded-full border-[1.5px] border-[#e2e8da] text-[10px] font-bold text-[#7c8a96] flex-shrink-0">?</span>
        <span className="underline underline-offset-2">{whyOpen[id] ? 'Hide' : 'Why do we ask this?'}</span>
      </button>
      {whyOpen[id] && (
        <div className="mt-2 py-3 px-4 bg-[#f5f7f0] border-l-[3px] border-[#0a8754] rounded-r-md text-[13.5px] leading-relaxed text-[#4a5548]">
          {text}
        </div>
      )}
    </div>
  );

  // --- step renderers ---
  const stepContent = () => {
    if (step === 0) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Tell us about yourself.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Let&apos;s start with the basics.</p>
        <div className="grid gap-[22px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inputField('name', 'Full Name', 'text', 'e.g., Mike Thompson', true)}
            <div>
              <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
                Company / Entity Name <span className="font-normal text-[#90a4ae] ml-1">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Thompson Capital LLC"
                value={form.company}
                onChange={e => sf('company', e.target.value)}
                className="w-full px-[13px] py-[10px] text-sm text-[#1a2e28] bg-white border-[1.5px] border-[#e2e8da] rounded-lg outline-none transition-colors focus:border-[#0a8754] font-[family-name:var(--font-body)]"
              />
              {whyBlock('company', 'If you plan to lend through an LLC, trust, or other entity, enter that here. If lending personally, leave blank.')}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inputField('email', 'Email', 'email', 'you@company.com', true)}
            {inputField('phone', 'Phone', 'tel', '(314) 555-0000', true)}
          </div>
          <div className="max-w-[420px]">
            {selectField('relationshipSource', 'How do you know Kevin?', ['Existing relationship', 'Referral', 'Met at event', 'Other'], true)}
          </div>
          {form.relationshipSource === 'Referral' && (
            <div className="max-w-[420px]">
              {inputField('referralName', 'Who referred you?', 'text', 'e.g., John Smith', true)}
            </div>
          )}
        </div>
      </div>
    );

    if (step === 1) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Your lending background.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-6 leading-relaxed">Tell us about your experience with private lending.</p>

        {/* Top-of-step explainer */}
        <div className="mb-8 py-[18px] px-6 bg-[#f5f7f0] border-[1.5px] border-[#a7f3d0] rounded-[10px] flex gap-3 items-start">
          <span className="text-lg leading-none flex-shrink-0">i</span>
          <div className="text-[#4a5e56] text-[13.5px] leading-relaxed">
            Private money lending is straightforward: you lend capital for a real estate acquisition, your loan is secured by a first-position lien on the property (just like a bank mortgage), and you earn interest on your capital. When the property sells or is refinanced, you are paid back first — principal plus interest — before we take any profit. Every deal is different, so we finalize all terms together before anything moves forward.
          </div>
        </div>

        <div className="grid gap-[22px]">
          <div className="max-w-[420px]">
            {selectField('lendingExperience', 'How long have you been lending on real estate?', [
              "I'm new to this",
              'Less than 1 year',
              '1\u20133 years',
              '3\u201310 years',
              '10+ years',
            ], true)}
            {form.lendingExperience === "I'm new to this" && whyBlock('newLender', "That's completely fine. Private lending means you're lending your own capital, secured by real property. We'll walk through everything in detail at our meeting \u2014 no experience required.")}
          </div>

          <div className="max-w-[420px]">
            {selectField('numLoansFunded', 'Approximately how many loans have you funded?', [
              'None yet \u2014 this would be my first',
              '1\u20135',
              '6\u201320',
              '20+',
            ], true)}
          </div>

          {radioGroup('hasActiveLoans', 'Do you currently have any active loans out?', [
            { v: 'yes', l: 'Yes' },
            { v: 'no', l: 'No' },
          ], true)}

          {form.hasActiveLoans === 'yes' && (
            <div className="max-w-[200px]">
              {inputField('activeLoanCount', 'How many?', 'number', 'e.g., 3', true)}
            </div>
          )}
        </div>
      </div>
    );

    if (step === 2) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Lending preferences.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">What types of loans and properties are you comfortable with?</p>
        <div className="grid gap-[26px]">
          <div>
            <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
              What loan amount range are you comfortable with? <span className="text-[#c0392b] ml-[3px]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dollarField('loanAmountMin', 'Minimum', '50000', false)}
              {dollarField('loanAmountMax', 'Maximum', '250000', false)}
            </div>
            {errors.loanAmount && <div className="mt-[5px] text-[12.5px] text-[#c0392b]">{errors.loanAmount}</div>}
            {whyBlock('amount', "This helps us match you with deals in your comfort zone. For example, if you're comfortable lending $50K\u2013$150K, we won't bring you a $400K deal.")}
          </div>

          <hr className="border-none border-t border-[#eef1ea]" />

          {chipGroup('preferredTerms', 'Preferred loan duration', ['6 months', '12 months', '18 months', '24 months', 'Flexible'], true)}
          {whyBlock('terms', "Most of our acquisitions are short-term holds \u2014 typically 6 to 18 months. On a flip, you're paid back when the property sells. On a BRRRR (Buy, Rehab, Rent, Refinance, Repeat), you're paid back when we refinance into permanent financing. Select all timeframes you'd consider. We'll confirm exact terms on each deal before you commit.")}

          <hr className="border-none border-t border-[#eef1ea]" />

          {chipGroup('propertyTypes', 'Property types you\'re open to', ['Single Family', 'Duplex', '3\u20134 Unit', '5+ Unit', 'Land / Lot'], true)}

          <hr className="border-none border-t border-[#eef1ea]" />

          <div className="max-w-[420px]">
            {selectField('geoPreference', 'Geographic preference', ['St. Louis metro only', 'Anywhere in Missouri', 'Open to other markets'], true)}
          </div>
        </div>
      </div>
    );

    if (step === 3) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Logistics.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">A few details about how you operate so we can match you efficiently.</p>
        <div className="grid gap-[26px]">
          <div className="max-w-[420px]">
            {selectField('fundingSpeed', 'How quickly can you typically fund a loan?', [
              'Within 48 hours',
              'Within 1 week',
              '2\u20133 weeks',
              '30+ days',
              'Depends on the deal',
            ], true)}
          </div>

          <hr className="border-none border-t border-[#eef1ea]" />

          <div className="max-w-[420px]">
            {selectField('requiresAppraisal', 'Do you require a third-party appraisal?', [
              'Yes, always',
              "No \u2014 I trust the team's numbers",
              'Depends on the deal',
            ], true)}
            {whyBlock('appraisal', "We provide a full deal analysis on every property including ARV (after-repair value), comparable sales, and repair estimates. Some lenders also want an independent appraisal \u2014 either way works.")}
          </div>

          <hr className="border-none border-t border-[#eef1ea]" />

          <div className="max-w-[420px]">
            {selectField('lendingEntityType', 'Will you be lending personally or through an entity?', [
              'Personally',
              'LLC',
              'Trust',
              'Self-directed IRA/401k',
              'Not sure yet',
            ], true)}
            {form.lendingEntityType === 'Self-directed IRA/401k' && whyBlock('sdira', "Yes, you can lend from a self-directed retirement account. This requires a custodian \u2014 we can point you to ones our partners use. We'll cover this at our meeting if it applies to you.")}
          </div>

          <hr className="border-none border-t border-[#eef1ea]" />

          {radioGroup('usesServicer', 'Do you use a loan servicing company?', [
            { v: 'yes', l: 'Yes' },
            { v: 'no', l: 'No' },
            { v: 'whats_that', l: "What's that?" },
          ], true)}
          {whyBlock('servicer', "A loan servicer collects payments and manages the loan paperwork on your behalf. If you don't use one, we handle payments directly. We'll discuss what makes sense at our meeting.")}
        </div>
      </div>
    );

    if (step === 4) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Almost done.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Just a couple more things and you&apos;re all set.</p>
        <div className="grid gap-[26px]">
          {radioGroup('isAccredited', 'Are you an accredited investor?', [
            { v: 'Yes', l: 'Yes' },
            { v: 'No', l: 'No' },
            { v: 'Not sure', l: "I'm not sure" },
          ], true)}
          {whyBlock('accredited', "An accredited investor is someone with a net worth over $1M (excluding primary residence) or annual income over $200K ($300K joint). This doesn't affect whether you can lend \u2014 it helps us understand your financial profile. If you're not sure, no worries \u2014 we'll discuss it.")}

          <hr className="border-none border-t border-[#eef1ea]" />

          {radioGroup('readyNow', 'Are you ready to start lending now?', [
            { v: 'Yes \u2014 I have capital available', l: 'Yes \u2014 I have capital available' },
            { v: 'Not yet \u2014 within 3 months', l: 'Not yet \u2014 within 3 months' },
            { v: 'Not yet \u2014 within 6 months', l: 'Not yet \u2014 within 6 months' },
            { v: 'Just learning for now', l: 'Just learning for now' },
          ], true)}

          <hr className="border-none border-t border-[#eef1ea]" />

          <div>
            <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
              Anything else you&apos;d like us to know? <span className="font-normal text-[#90a4ae] ml-1">(optional)</span>
            </label>
            <textarea
              placeholder="Questions, preferences, concerns — anything at all..."
              value={form.additionalNotes}
              onChange={e => sf('additionalNotes', e.target.value)}
              className="w-full px-[13px] py-[10px] text-sm text-[#1a2e28] bg-white border-[1.5px] border-[#e2e8da] rounded-lg outline-none transition-colors focus:border-[#0a8754] resize-y min-h-[100px] font-[family-name:var(--font-body)]"
            />
          </div>
        </div>
      </div>
    );

    return null;
  };

  // --- confirmation screen ---
  if (submitted) return (
    <div className="min-h-screen bg-[#fafbf8] flex flex-col">
      <div className="py-[18px] px-8 border-b border-[#e2e8da] bg-white flex items-center gap-[10px]">
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.3px' }}>
          Restore <span style={{ color: '#ffc200' }}>STL</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-[540px] w-full text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-7 text-4xl">&#10003;</div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-[#1a2e28] mb-[14px] font-bold">
            Thank you, {(form.name || 'there').split(' ')[0]}.
          </h1>
          <p className="text-[#4a5e56] text-base leading-relaxed mb-9">
            Kevin will reach out within 48 hours to schedule a meeting where you&apos;ll review opportunities and finalize terms together. No commitment is made until you&apos;ve reviewed a specific deal and agreed to terms.
          </p>

          <div className="bg-white border border-[#eef1ea] rounded-[14px] py-7 px-8 text-left">
            <div className="font-semibold text-[#1a2e28] text-[15px] mb-5">What happens next:</div>
            {[
              { n: 1, title: 'Kevin reviews your application', sub: 'Usually within 48 hours.' },
              { n: 2, title: 'You\u2019ll schedule a call or in-person meeting', sub: 'To walk through opportunities and answer any questions.' },
              { n: 3, title: 'When a deal fits your criteria, we bring it to you', sub: 'With a full analysis \u2014 ARV, comps, repair estimates, and projected returns.' },
              { n: 4, title: 'You review the numbers, agree to terms, and fund at closing', sub: 'No surprises. You always know the deal before committing.' },
            ].map(({ n, title, sub }, i) => (
              <div key={n} className={`flex gap-[14px] ${i < 3 ? 'mb-6' : ''}`}>
                <div className="w-[30px] h-[30px] rounded-full bg-[#0a8754] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0 mt-[1px]">{n}</div>
                <div>
                  <div className="font-semibold text-[#1a2e28] text-[15px] mb-[3px]">{title}</div>
                  <div className="text-[#7c8a96] text-[13.5px]">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#90a4ae] text-[13px] mt-7">
            Your information is kept strictly confidential and is never shared outside of Restore STL.
          </p>
          <p className="text-[#90a4ae] text-[13px] mt-3">
            Questions? Call Kevin at <a href="tel:+13147363311" className="text-[#0a8754]">(314) 736-3311</a>
          </p>
        </div>
      </div>
    </div>
  );

  // --- main form layout ---
  return (
    <div className="min-h-screen bg-[#fafbf8] font-[family-name:var(--font-body)] text-[#1a2e28]">
      {/* Header */}
      <div className="py-[18px] px-8 border-b border-[#e2e8da] bg-white flex items-center justify-between sticky top-0 z-10">
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.3px' }}>
          Restore <span style={{ color: '#ffc200' }}>STL</span>
        </span>
        <span className="text-xs text-[#90a4ae] font-medium tracking-wider uppercase">Capital Partners</span>
      </div>

      {/* Progress */}
      <div className="max-w-[860px] mx-auto pt-7 px-8">
        <div className="flex gap-[5px] mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex-1 h-[3px] rounded-sm transition-colors duration-300 ${i <= step ? 'bg-[#0a8754]' : 'bg-[#dce0d6]'}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#90a4ae] mb-9">
          <span>Step {step + 1} of 5</span>
          <span className="font-semibold text-[#4a5e56]">{STEPS[step]}</span>
        </div>
      </div>

      {/* Header copy — only on step 0 */}
      {step === 0 && (
        <div className="max-w-[860px] mx-auto px-8 mb-10">
          <div className="py-6 px-7 bg-white border border-[#eef1ea] rounded-[14px]">
            <h1 className="font-[family-name:var(--font-heading)] text-[22px] text-[#0f172a] mb-3 font-extrabold">Capital Partner Application</h1>
            <p className="text-[#4a5e56] text-[14px] leading-relaxed mb-4">
              Restore STL works with a small network of trusted lending partners to fund real estate acquisitions across the St. Louis metro.
            </p>

            <div className="text-[#4a5e56] text-[14px] leading-relaxed mb-4">
              <div className="font-semibold text-[#0f172a] mb-2">How it works:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Each loan is secured by a <strong>first-position lien</strong> on the property &mdash; your capital is never co-mingled with other lenders</li>
                <li>Terms including interest rate, loan duration, and structure are <strong>finalized together at an in-person or virtual meeting</strong> before any commitment</li>
                <li>Rates vary by deal based on property type, acquisition price, and timeline</li>
                <li>This application helps us understand your lending preferences so we can match you with the right opportunities</li>
              </ul>
            </div>

            <div className="text-[#4a5e56] text-[14px] leading-relaxed mb-4">
              <div className="font-semibold text-[#0f172a] mb-2">How you get paid:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Fix &amp; flip deals:</strong> After we acquire, renovate, and sell the property, you are paid back <strong>first at closing</strong> &mdash; principal plus agreed-upon interest &mdash; before we take any profit</li>
                <li><strong>BRRRR deals (Buy, Rehab, Rent, Refinance, Repeat):</strong> You are paid back in full when we refinance into long-term financing, typically within 6&ndash;18 months</li>
                <li>In both cases, <strong>you are paid before we are.</strong> Your capital is returned first, every time.</li>
              </ul>
            </div>

            <p className="text-[#7c8a96] text-[13.5px]">
              <strong>Questions?</strong> Call Kevin at <a href="tel:+13147363311" className="text-[#0a8754]">(314) 736-3311</a>
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-8 pb-[120px]">
        {stepContent()}

        {/* Navigation */}
        <div className={`flex mt-12 pt-6 border-t border-[#eef1ea] ${step > 0 ? 'justify-between' : 'justify-end'}`}>
          {step > 0 && (
            <button type="button" onClick={goBack} className="py-3 px-7 rounded-lg border-[1.5px] border-[#e2e8da] bg-white text-[#4a5e56] text-sm font-semibold cursor-pointer font-[family-name:var(--font-body)]">
              &larr; Back
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            disabled={isSubmitting}
            className="py-[13px] px-9 rounded-lg border-none bg-[#ffc200] text-[#1e293b] text-sm font-bold cursor-pointer tracking-wide hover:bg-[#e6af00] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-body)]"
          >
            {isSubmitting ? 'Submitting\u2026' : step === 4 ? 'Submit Application \u2192' : 'Continue \u2192'}
          </button>
        </div>

        {submitError && (
          <div className="mt-4 p-4 bg-[#ffebee] border border-[#e53935] rounded-lg text-sm text-[#c62828]">
            {submitError}
          </div>
        )}
      </div>
    </div>
  );
}
