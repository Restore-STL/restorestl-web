import Link from 'next/link';

const pillars = [
  {
    title: 'We buy distressed houses',
    href: '/sell',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: 'We create investment opportunities',
    href: '#',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    title: 'We hire local talent. We create jobs.',
    href: '#',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: 'We make homeownership possible',
    href: '#',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
    ),
  },
];

export default function PeopleFirstMethod() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our People First Method
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar) => {
            const CardContent = (
              <>
                <div className="text-[var(--brand-yellow)] mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {pillar.title}
                </h3>
              </>
            );

            if (pillar.href.startsWith('/')) {
              return (
                <Link
                  key={pillar.title}
                  href={pillar.href}
                  className="bg-white/5 rounded-xl p-8 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 block"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <a
                key={pillar.title}
                href={pillar.href}
                className="bg-white/5 rounded-xl p-8 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 block"
              >
                {CardContent}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
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
