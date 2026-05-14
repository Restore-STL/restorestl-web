export default function HeroSection() {
  return (
    <section className="relative min-h-[350px] md:min-h-[450px] flex items-center justify-center text-white overflow-hidden">
      {/* Video placeholder — swap for <video> when TICKET-017 delivers */}
      <div className="absolute inset-0 bg-black" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          You&apos;ve Got Enough <span className="whitespace-nowrap">Going On.</span>
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-[var(--brand-yellow)]">
          Now You&apos;ve Got Us.
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Your friends in real estate.
        </p>
        <div className="flex justify-center">
          <a
            href="tel:+13147363311"
            className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
          >
            Call (314) 736-3311
          </a>
        </div>
      </div>
    </section>
  );
}
