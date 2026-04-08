'use client';

import { useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// API config (same pattern as WMHWWidget)
// ---------------------------------------------------------------------------
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://restorestl-backend-327709678368.us-central1.run.app';
const API_KEY = process.env.NEXT_PUBLIC_RESTORESTL || '';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STEPS = ['About You', 'Where You Buy', 'What You Buy', 'How You Buy', 'Preferences'] as const;

interface Area { a: string; z: string[] }
const AREAS: Area[] = [
  { a: 'STL City — South', z: ['63104','63109','63111','63116','63118','63139'] },
  { a: 'STL City — Central', z: ['63101','63102','63103','63108','63110'] },
  { a: 'STL City — North', z: ['63106','63107','63112','63113','63115','63120','63147'] },
  { a: 'STL City — West', z: ['63117','63119','63143','63144'] },
  { a: 'South County', z: ['63123','63125','63126','63127','63128','63129'] },
  { a: 'Mid County', z: ['63122','63124','63130','63131','63132','63146'] },
  { a: 'West County', z: ['63005','63011','63017','63021','63038','63040','63088','63141'] },
  { a: 'North County — Inner', z: ['63114','63121','63133','63134','63135','63136'] },
  { a: 'North County — Outer', z: ['63031','63033','63034','63042','63043','63044','63074','63137','63138'] },
  { a: 'St. Charles County', z: ['63301','63303','63304','63366','63367','63368','63376','63385'] },
  { a: 'Jefferson County', z: ['63010','63012','63016','63019','63020','63049','63050','63051','63052'] },
  { a: 'Franklin County', z: ['63023','63026','63028','63069','63090'] },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ZipState = Record<string, 'target' | 'nofly'>;
type Errors = Record<string, string>;

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  experience: string;
  zipState: ZipState;
  neighborhoodNotes: string;
  propTypes: string[];
  bedroomsMin: string;
  bedroomsMax: string;
  sqftMin: string;
  sqftMax: string;
  yearBuilt: string;
  maxPrice: string;
  minProfit: string;
  conditions: string[];
  strategies: string[];
  tenantPref: string[];
  fundingSrc: string[];
  preApproved: string;
  closeTimeline: string;
  responseSpeed: string;
  deliveryMethod: string[];
  readyNow: string;
  readyDate: string;
  additionalNotes: string;
}

const INITIAL_FORM: FormData = {
  name: '', company: '', email: '', phone: '', experience: '',
  zipState: {}, neighborhoodNotes: '',
  propTypes: [], bedroomsMin: '', bedroomsMax: '', sqftMin: '', sqftMax: '',
  yearBuilt: '', maxPrice: '', minProfit: '', conditions: [],
  strategies: [], tenantPref: [], fundingSrc: [],
  preApproved: '', closeTimeline: '', responseSpeed: '',
  deliveryMethod: [], readyNow: '', readyDate: '', additionalNotes: '',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function InvestorIntakePage() {
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

  const toggleZip = useCallback((z: string) => {
    setForm(prev => {
      const zs = { ...prev.zipState };
      if (!(z in zs)) zs[z] = 'target';
      else if (zs[z] === 'target') zs[z] = 'nofly';
      else delete zs[z];
      return { ...prev, zipState: zs };
    });
    setErrors(prev => { const n = { ...prev }; delete n.zipState; return n; });
  }, []);

  const setArea = useCallback((zips: string[], state: 'target' | 'nofly' | 'neutral') => {
    setForm(prev => {
      const zs = { ...prev.zipState };
      zips.forEach(z => { if (state === 'neutral') delete zs[z]; else zs[z] = state; });
      return { ...prev, zipState: zs };
    });
    setErrors(prev => { const n = { ...prev }; delete n.zipState; return n; });
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
      if (!form.experience) e.experience = 'Please select one';
    }
    if (step === 1) {
      const tc = Object.values(form.zipState).filter(v => v === 'target').length;
      if (!tc) e.zipState = 'Select at least one target ZIP code';
    }
    if (step === 2) {
      if (!form.propTypes.length) e.propTypes = 'Select at least one';
      if (!form.maxPrice.trim()) e.maxPrice = 'Required';
      if (!form.minProfit) e.minProfit = 'Please select one';
      if (!form.conditions.length) e.conditions = 'Select at least one';
    }
    if (step === 3) {
      if (!form.strategies.length) e.strategies = 'Select at least one';
      if (!form.fundingSrc.length) e.fundingSrc = 'Select at least one';
      if (!form.preApproved) e.preApproved = 'Please select one';
      if (!form.closeTimeline) e.closeTimeline = 'Please select one';
      if (!form.responseSpeed) e.responseSpeed = 'Please select one';
    }
    if (step === 4) {
      if (!form.deliveryMethod.length) e.deliveryMethod = 'Select at least one';
      if (!form.readyNow) e.readyNow = 'Please select one';
      if (form.readyNow === 'not_yet' && !form.readyDate) e.readyDate = 'Please provide a date';
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
      const payload = {
        name: form.name,
        company: form.company || null,
        email: form.email,
        phone: form.phone,
        experience_level: form.experience,
        locations: {
          target_zips: Object.entries(form.zipState).filter(([, v]) => v === 'target').map(([k]) => k),
          no_fly_zips: Object.entries(form.zipState).filter(([, v]) => v === 'nofly').map(([k]) => k),
          neighborhood_notes: form.neighborhoodNotes,
        },
        property_types: form.propTypes,
        bedrooms: {
          min: form.bedroomsMin && form.bedroomsMin !== 'No preference' ? parseInt(form.bedroomsMin) : null,
          max: form.bedroomsMax && form.bedroomsMax !== 'No preference' ? parseInt(form.bedroomsMax) : null,
        },
        sqft: {
          min: form.sqftMin ? Number(form.sqftMin) : null,
          max: form.sqftMax ? Number(form.sqftMax) : null,
        },
        year_built_preference: form.yearBuilt,
        max_acquisition_price: form.maxPrice ? Number(form.maxPrice) : null,
        min_profit_per_deal: form.minProfit,
        condition_preference: form.conditions,
        strategy: form.strategies,
        tenant_preference: form.tenantPref,
        funding_source: form.fundingSrc,
        pre_approved: form.preApproved,
        close_timeline_days: form.closeTimeline,
        response_speed: form.responseSpeed,
        deal_delivery_method: form.deliveryMethod,
        ready_date: form.readyNow === 'yes' ? 'now' : form.readyDate,
        additional_notes: form.additionalNotes,
      };

      const res = await fetch(`${API_BASE_URL}/api/buyers/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setSubmitError('Something went wrong — please try again or email kevin@restorestl.com');
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

  // --- ZIP code map ---
  const zipCounts = Object.values(form.zipState).reduce(
    (acc, v) => { if (v === 'target') acc.target++; else if (v === 'nofly') acc.nofly++; return acc; },
    { target: 0, nofly: 0 }
  );

  const zipMap = () => (
    <div>
      {AREAS.map((area, ai) => {
        const areaTarget = area.z.filter(z => form.zipState[z] === 'target').length;
        const areaNofly = area.z.filter(z => form.zipState[z] === 'nofly').length;
        return (
          <div key={ai} className="mb-5">
            <div className="flex items-center gap-[10px] mb-2 flex-wrap">
              <span className="text-[11px] font-bold text-[#4a5e56] uppercase tracking-wider whitespace-nowrap">{area.a}</span>
              <div className="flex-1 h-px bg-[#eef1ea] min-w-[10px]" />
              <span className="text-[11px]">
                {areaTarget > 0 && <span className="text-[#2e7d32]">{areaTarget}&#10003; </span>}
                {areaNofly > 0 && <span className="text-[#e53935]">{areaNofly}&#10007;</span>}
              </span>
              <div className="flex">
                <button type="button" onClick={() => setArea(area.z, 'target')} className="text-[11px] bg-none border-none cursor-pointer px-[7px] py-[2px] text-[#2e7d32] font-[family-name:var(--font-body)]">All target</button>
                <span className="text-[#eef1ea] px-[2px]">|</span>
                <button type="button" onClick={() => setArea(area.z, 'nofly')} className="text-[11px] bg-none border-none cursor-pointer px-[7px] py-[2px] text-[#e53935] font-[family-name:var(--font-body)]">All no-fly</button>
                <span className="text-[#eef1ea] px-[2px]">|</span>
                <button type="button" onClick={() => setArea(area.z, 'neutral')} className="text-[11px] bg-none border-none cursor-pointer px-[7px] py-[2px] text-[#7c8a96] font-[family-name:var(--font-body)]">Clear</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {area.z.map(z => {
                const st = form.zipState[z];
                return (
                  <button
                    key={z}
                    type="button"
                    onClick={() => toggleZip(z)}
                    className={`px-3 py-[6px] rounded-md text-[13px] cursor-pointer select-none transition-all font-[family-name:var(--font-body)] font-normal ${
                      st === 'target'
                        ? 'border-[1.5px] border-[#4caf50] bg-[#e8f5e9] text-[#2e7d32] font-semibold'
                        : st === 'nofly'
                        ? 'border-[1.5px] border-[#e53935] bg-[#ffebee] text-[#c62828] font-semibold'
                        : 'border-[1.5px] border-[#cfd8dc] bg-[#eceff1] text-[#78909c]'
                    }`}
                  >
                    {z}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  // --- step renderers ---
  const stepContent = () => {
    if (step === 0) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Tell us about yourself.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Let&apos;s start with the basics so Kevin knows who he&apos;s working with.</p>
        <div className="grid gap-[22px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inputField('name', 'Full Name', 'text', 'e.g., Derrick Hibbler', true)}
            <div>
              <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
                Company Name <span className="font-normal text-[#90a4ae] ml-1">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Tellus Holdings LLC"
                value={form.company}
                onChange={e => sf('company', e.target.value)}
                className="w-full px-[13px] py-[10px] text-sm text-[#1a2e28] bg-white border-[1.5px] border-[#e2e8da] rounded-lg outline-none transition-colors focus:border-[#0a8754] font-[family-name:var(--font-body)]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inputField('email', 'Email', 'email', 'you@company.com', true)}
            {inputField('phone', 'Phone', 'tel', '(314) 555-0000', true)}
          </div>
          <div className="max-w-[420px]">
            {selectField('experience', 'How many properties do you currently own?', ['0 — this would be my first', '1–5 properties', '6–20 properties', '20+ properties'], true)}
          </div>
          {whyBlock('exp', "This helps Kevin tailor how he presents deals to you. A first-time buyer gets a different walkthrough than someone who's closed 50 deals. No wrong answer here.")}
        </div>
      </div>
    );

    if (step === 1) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Where do you want to buy?</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Select your target areas and zones you want to avoid.</p>

        {/* Callout */}
        <div className="mb-7 py-[18px] px-6 bg-[#f5f7f0] border-[1.5px] border-[#a7f3d0] rounded-[10px] flex gap-3 items-start">
          <span className="text-lg leading-none">📍</span>
          <div>
            <div className="font-semibold text-[#0a8754] text-sm mb-[5px]">St. Louis is a block-by-block city.</div>
            <div className="text-[#4a5e56] text-[13.5px] leading-relaxed">We know a ZIP code doesn&apos;t tell the whole story. After you submit, Kevin and Chris will schedule a short call to fine-tune your buy box — specific streets, neighborhoods, and boundaries that matter to you.</div>
          </div>
        </div>

        <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
          Target & No-Fly ZIP Codes <span className="text-[#c0392b] ml-[3px]">*</span>
        </label>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-3 flex-wrap text-[12.5px]">
          <span className="flex items-center gap-[5px] text-[#7c8a96]"><span className="w-[10px] h-[10px] rounded-full bg-[#90a4ae] inline-block" />Neutral</span>
          <span className="flex items-center gap-[5px] text-[#7c8a96]"><span className="w-[10px] h-[10px] rounded-full bg-[#4caf50] inline-block" />Target &#10003;</span>
          <span className="flex items-center gap-[5px] text-[#7c8a96]"><span className="w-[10px] h-[10px] rounded-full bg-[#e53935] inline-block" />No-Fly &#10007;</span>
          <span className="ml-auto text-[12.5px]">
            {zipCounts.target > 0 && <span className="text-[#2e7d32] mr-3">&#10003; {zipCounts.target} target ZIP{zipCounts.target !== 1 ? 's' : ''}</span>}
            {zipCounts.nofly > 0 && <span className="text-[#e53935]">&#10007; {zipCounts.nofly} no-fly ZIP{zipCounts.nofly !== 1 ? 's' : ''}</span>}
          </span>
        </div>

        {/* Hint */}
        <div className="text-xs text-[#7c8a96] mb-[18px] py-2 px-3 bg-[#f5f7f2] rounded-md leading-relaxed">
          Click once → <strong className="text-[#2e7d32]">Target</strong> &nbsp;·&nbsp; Click again → <strong className="text-[#e53935]">No-Fly</strong> &nbsp;·&nbsp; Click again → Clear &nbsp;·&nbsp; Use <em>All target / All no-fly / Clear</em> for a whole area at once.
        </div>

        {zipMap()}
        {errors.zipState && <div className="mt-[5px] text-[12.5px] text-[#c0392b]">{errors.zipState}</div>}
        {whyBlock('zip', "Your target ZIPs tell us the broad areas you're interested in. The no-fly list tells us where to never bother you. We'll dial in the details together on a call.")}

        <hr className="border-none border-t border-[#eef1ea] my-[26px]" />

        <div>
          <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
            Neighborhood Notes <span className="font-normal text-[#90a4ae] ml-1">(optional)</span>
          </label>
          <textarea
            placeholder="e.g., South of Gravois, east of Hampton. Nothing north of Natural Bridge in 63121."
            value={form.neighborhoodNotes}
            onChange={e => sf('neighborhoodNotes', e.target.value)}
            className="w-full px-[13px] py-[10px] text-sm text-[#1a2e28] bg-white border-[1.5px] border-[#e2e8da] rounded-lg outline-none transition-colors focus:border-[#0a8754] resize-y font-[family-name:var(--font-body)]"
          />
        </div>
      </div>
    );

    if (step === 2) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">What are you looking for?</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Tell us about the types of properties and deals that fit your strategy.</p>
        <div className="grid gap-[26px]">
          {chipGroup('propTypes', 'Property Types', ['Single Family', 'Duplex', '3-4 Unit', '5+ Unit', 'Land / Lot'], true)}
          {whyBlock('prop', "Some investors only want single-family homes. Others love duplexes for the cash flow. Telling us upfront means we never waste your time with properties that don't fit.")}

          <hr className="border-none border-t border-[#eef1ea]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {selectField('bedroomsMin', 'Bedrooms — Min', ['No preference','1+','2+','3+','4+','5+'], false, 'Any')}
            {selectField('bedroomsMax', 'Bedrooms — Max', ['No preference','1','2','3','4','5+'], false, 'Any')}
            {inputField('sqftMin', 'Square Footage — Min', 'number', 'e.g., 800', false)}
            {inputField('sqftMax', 'Square Footage — Max', 'number', 'e.g., 2,500', false)}
          </div>

          <hr className="border-none border-t border-[#eef1ea]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              {selectField('yearBuilt', 'Year Built Preference', ['Any era','Post-1980','Post-1960','Post-1940','No preference'], false)}
              {whyBlock('yr', "Older homes in St. Louis can mean lead paint, knob-and-tube wiring, or stone foundations. Some investors prefer them because the price reflects it. Others avoid pre-1950 entirely.")}
            </div>
            {inputField('maxPrice', 'Max Acquisition Price (USD)', 'number', 'e.g., 150000', true)}
          </div>

          <div className="max-w-[440px]">
            {selectField('minProfit', "Minimum profit you'd need on a deal?", ['$5,000+','$10,000+','$15,000+','$25,000+','$50,000+','Depends on the deal (discuss with Kevin)'], true)}
            {whyBlock('profit', "If we find a property where the numbers work out to $10,000 in potential profit — after purchase price, repairs, and holding costs — is that worth your time? Or do you need $25,000+?")}
          </div>

          <hr className="border-none border-t border-[#eef1ea]" />

          {chipGroup('conditions', 'Condition Preference', ['Turnkey / Move-in ready','Light rehab (cosmetic)','Moderate rehab (kitchen/bath, systems)','Heavy rehab (structural)','Teardown / Land value'], true)}
          {whyBlock('cond', "A turnkey rental and a gut rehab are completely different deals. Selecting multiple options is fine.")}
        </div>
      </div>
    );

    if (step === 3) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">How do you operate?</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Understanding your strategy and financing helps us send you the right deals at the right time.</p>
        <div className="grid gap-[26px]">
          {chipGroup('strategies', 'Investment Strategy', ['Fix and rent (BRRR)','Fix and sell (flip)','Buy and hold as-is','Section 8 rental','Wholesale re-assign'], true)}
          {whyBlock('strat', "This tells us what kind of deals to look for. A BRRR investor wants a different property than someone looking for a turnkey rental. Select all that apply.")}

          <hr className="border-none border-t border-[#eef1ea]" />

          {chipGroup('tenantPref', 'Tenant Preference', ['Vacant only','Occupied is OK','Section 8 / voucher tenants OK','No preference'], false)}

          <hr className="border-none border-t border-[#eef1ea]" />

          {chipGroup('fundingSrc', 'Funding Source', ['Cash','Hard money / bridge loan','Conventional mortgage','Private money','Other'], true)}

          <hr className="border-none border-t border-[#eef1ea]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {radioGroup('preApproved', 'Pre-approved or proof of funds ready?', [
              { v: 'yes', l: 'Yes — ready to go' },
              { v: 'working', l: 'Working on it' },
              { v: 'not_yet', l: 'Not yet' },
            ], true)}
            <div className="grid gap-5">
              {selectField('closeTimeline', 'How quickly can you close?', ['7 days or less','14 days','21 days','30 days','30+ days'], true)}
              {selectField('responseSpeed', 'How fast can you say yes or no on a deal?', ['Same day','24 hours','48 hours','I need to visit the property first'], true)}
            </div>
          </div>
        </div>
      </div>
    );

    if (step === 4) return (
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-[#1a2e28] mb-2 font-extrabold">Almost done.</h2>
        <p className="text-[#7c8a96] text-[15px] mb-8 leading-relaxed">Just a few preferences so we can reach you the right way.</p>
        <div className="grid gap-[26px]">
          {chipGroup('deliveryMethod', 'How do you want to receive deals?', ['Email','Text message','Phone call'], true)}
          {whyBlock('del', "We want to reach you the way that works best. Some investors want a quick text. Others want a full breakdown emailed.")}

          <hr className="border-none border-t border-[#eef1ea]" />

          {radioGroup('readyNow', 'Are you ready to buy now?', [
            { v: 'yes', l: 'Yes — actively looking' },
            { v: 'not_yet', l: "Not yet (I'll provide a target date)" },
          ], true)}

          {form.readyNow === 'not_yet' && (
            <div className="max-w-[260px]">
              {inputField('readyDate', 'When do you expect to be ready?', 'date', '', true)}
            </div>
          )}

          <hr className="border-none border-t border-[#eef1ea]" />

          <div>
            <label className="block mb-[7px] text-sm font-semibold text-[#1a2e28]">
              Anything else Kevin should know? <span className="font-normal text-[#90a4ae] ml-1">(optional)</span>
            </label>
            <textarea
              placeholder="Special criteria, dealbreakers, markets outside STL, or anything else..."
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
          <div className="w-[72px] h-[72px] rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-7 text-4xl">✓</div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-[#1a2e28] mb-[14px] font-bold">
            You&apos;re in, {(form.name || 'there').split(' ')[0]}.
          </h1>
          <p className="text-[#4a5e56] text-base leading-relaxed mb-9">Your buy box is locked in. Here&apos;s what happens next.</p>

          <div className="bg-white border border-[#eef1ea] rounded-[14px] py-7 px-8 text-left">
            {[
              { n: 1, title: 'Kevin and Chris review your profile', sub: 'Usually within 48 hours.' },
              { n: 2, title: 'We schedule a short call', sub: "St. Louis is block-by-block — we'll fine-tune your boundaries together." },
              { n: 3, title: 'You start receiving deals', sub: 'Only deals that fit your buy box. No spam, no shotgun blasts.' },
            ].map(({ n, title, sub }, i) => (
              <div key={n} className={`flex gap-[14px] ${i < 2 ? 'mb-6' : ''}`}>
                <div className="w-[30px] h-[30px] rounded-full bg-[#0a8754] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0 mt-[1px]">{n}</div>
                <div>
                  <div className="font-semibold text-[#1a2e28] text-[15px] mb-[3px]">{title}</div>
                  <div className="text-[#7c8a96] text-[13.5px]">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#90a4ae] text-[13px] mt-7">
            Questions? Email Kevin at <a href="mailto:kevin@restorestl.com" className="text-[#0a8754]">kevin@restorestl.com</a>
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
        <span className="text-xs text-[#90a4ae] font-medium tracking-wider uppercase">Investor Network</span>
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

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-8 pb-[120px]">
        {stepContent()}

        {/* Navigation */}
        <div className={`flex mt-12 pt-6 border-t border-[#eef1ea] ${step > 0 ? 'justify-between' : 'justify-end'}`}>
          {step > 0 && (
            <button type="button" onClick={goBack} className="py-3 px-7 rounded-lg border-[1.5px] border-[#e2e8da] bg-white text-[#4a5e56] text-sm font-semibold cursor-pointer font-[family-name:var(--font-body)]">
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            disabled={isSubmitting}
            className="py-[13px] px-9 rounded-lg border-none bg-[#ffc200] text-[#1e293b] text-sm font-bold cursor-pointer tracking-wide hover:bg-[#e6af00] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-body)]"
          >
            {isSubmitting ? 'Submitting…' : step === 4 ? 'Submit My Buy Box →' : 'Continue →'}
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
