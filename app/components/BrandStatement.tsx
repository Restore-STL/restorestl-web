export default function BrandStatement() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission body — no big headline */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-center mb-16 max-w-3xl mx-auto">
          Restore STL is a St. Louis team that buys distressed properties, puts
          local crews to work, and creates homes people are proud to own. This
          isn&apos;t a side hustle &mdash; it&apos;s a mission.
        </p>

        {/* TIME / ENERGY / MONEY with lead-in */}
        <p className="text-center text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-6">
          Every seller has three resources
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--background-gray)] rounded-xl p-6 text-center border border-[var(--border-gray)]">
            <div className="text-[var(--charcoal-deep)] text-3xl mb-3">&#9201;</div>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              TIME
            </h4>
            <p className="text-[var(--text-secondary)] text-sm">
              Know where you stand in minutes, not weeks.
            </p>
          </div>

          <div className="bg-[var(--background-gray)] rounded-xl p-6 text-center border border-[var(--border-gray)]">
            <div className="text-[var(--charcoal-deep)] text-3xl mb-3">&#128267;</div>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              ENERGY
            </h4>
            <p className="text-[var(--text-secondary)] text-sm">
              No showings. No staging. No strangers in your house.
            </p>
          </div>

          <div className="bg-[var(--background-gray)] rounded-xl p-6 text-center border border-[var(--border-gray)]">
            <div className="text-[var(--charcoal-deep)] text-3xl mb-3">&#128176;</div>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              MONEY
            </h4>
            <p className="text-[var(--text-secondary)] text-sm">
              No money out of pocket. No commissions. No surprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
