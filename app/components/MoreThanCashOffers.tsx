import Link from 'next/link';

type Resource = {
  brand: string;
  opener: string;
  body: string;
  url: string;
  urlDisplay: string;
};

const resources: Resource[] = [
  {
    brand: 'Stop Foreclosure STL',
    opener: 'If you\u2019re behind on payments.',
    body: 'Missouri is a non-judicial foreclosure state with specific windows and specific options. We walk you through all of them \u2014 no pressure to pick ours.',
    url: 'https://stopforeclosurestl.com',
    urlDisplay: 'stopforeclosurestl.com',
  },
  {
    brand: 'Probate Help STL',
    opener: 'If you inherited a home.',
    body: 'Missouri probate is confusing by default. Executor process, timelines, attorney referrals, and property paths \u2014 explained plainly. You\u2019ll know your options before making any.',
    url: 'https://probatehelpstl.com',
    urlDisplay: 'probatehelpstl.com',
  },
];

export default function MoreThanCashOffers() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kicker */}
        <div className="text-center text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          We&rsquo;ve done our homework
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-6">
          Some situations need their own playbook.
        </h2>

        {/* Subhead */}
        <p className="text-lg text-[var(--text-secondary)] text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          After enough years in St. Louis real estate, the patterns get clear. Certain situations &mdash; foreclosure, probate &mdash; come with their own rules, their own timelines, and their own misconceptions. We&rsquo;ve built dedicated resources so the first conversation covers what matters, not the basics.
        </p>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {resources.map((r) => (
            <a
              key={r.url}
              href={r.url}
              rel="noopener"
              className="group bg-[var(--background-gray)] rounded-xl p-6 md:p-8 border border-[var(--border-gray)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 block"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                {r.brand}
              </h3>
              <p className="font-semibold text-[var(--text-primary)] mb-3">
                {r.opener}
              </p>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {r.body}
              </p>
              <div className="flex items-center gap-2 text-[var(--brand-yellow)] font-semibold group-hover:gap-3 transition-all">
                <span>{r.urlDisplay}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Fallback */}
        <div className="text-center">
          <p className="text-[var(--text-secondary)] text-lg mb-4">
            Not sure what category you&rsquo;re in? Start with Kevin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+13147363311"
              className="inline-flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--brand-yellow)] font-semibold text-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (314) 736-3311
            </a>
            <span className="text-[var(--text-secondary)] hidden sm:inline">
              &middot;
            </span>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--brand-yellow)] font-semibold text-lg transition-colors"
            >
              Book 15 minutes
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
