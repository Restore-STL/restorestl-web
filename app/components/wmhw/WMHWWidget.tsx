export default function WMHWWidget() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border-gray)] bg-[var(--background-gray)] p-8 md:p-10 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
        Get your numbers, straight from Kevin.
      </h3>
      <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto">
        Talk to Kevin for a real, no-pressure walk-through of what your home is worth and what your options look like. No forms, no callbacks — just a conversation.
      </p>
      <a
        href="tel:+13147363311"
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-yellow)] px-6 py-3.5 text-[var(--charcoal-deep)] font-bold text-base md:text-lg hover:bg-[var(--brand-yellow-hover)] transition-colors duration-200 min-h-[48px]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call (314) 736-3311
      </a>
    </div>
  );
}
