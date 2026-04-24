import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Restore STL | St. Louis Real Estate Team',
  description:
    'Meet the Restore STL team. Local St. Louis real estate professionals restoring neighborhoods one home at a time with honest numbers and real options.',
};

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  description: string;
  photo?: { src: string; alt: string };
};

const TEAM: TeamMember[] = [
  {
    initials: 'KD',
    name: 'Kevin Dairaghi',
    role: 'Founder',
    description:
      'Kevin has spent 20 years buying houses in St. Louis. He\u2019s your first call \u2014 he walks the property, talks through your situation, and runs the math. Cash offer or listing with an agent, Kevin gives you honest numbers and a clear path.',
    photo: {
      src: '/team/kevin-dairaghi.jpg',
      alt: 'Kevin Dairaghi, Founder of Restore STL',
    },
  },
  {
    initials: 'CO',
    name: 'Chris O\u2019Keefe',
    role: 'Technology Director',
    description:
      'Chris handles the research and tools behind every Restore STL conversation. Before Kevin calls, Chris has pulled the comparable sales, checked ownership and title history, and pressure-tested the numbers. He also researches and edits The STL Read, the blog you\u2019re reading now.',
    photo: {
      src: '/team/chris-okeefe.jpg',
      alt: 'Chris O\u2019Keefe, Technology Director at Restore STL',
    },
  },
];

const PILLARS = [
  {
    icon: '\uD83E\uDDE0',
    quote: 'The most important real estate is between your ears.',
    theme: 'Mindset',
  },
  {
    icon: '\u2696\uFE0F',
    quote: 'Personal drives professional.',
    theme: 'Balance',
  },
  {
    icon: '\uD83E\uDD1D',
    quote: 'It\u2019s all about relationships.',
    theme: 'Connection',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── Section 1: Hero ─────────────────────────────────────── */}
        <section className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              People First
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Small team, big impact.
            </p>
          </div>
        </section>

        {/* ── Section 2: The Team ─────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
              The Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
              {TEAM.map((member) => (
                <div
                  key={member.initials}
                  className="bg-[var(--background-gray)] rounded-xl p-8 text-center border border-[var(--border-gray)]"
                >
                  <div className="flex justify-center mb-6">
                    {member.photo ? (
                      <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[var(--brand-yellow)]/30">
                        <Image
                          src={member.photo.src}
                          alt={member.photo.alt}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-[#1a1a1a] flex items-center justify-center ring-4 ring-[var(--brand-yellow)]/30">
                        <span className="text-4xl font-bold text-[var(--brand-yellow)]">
                          {member.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[var(--brand-yellow)] mb-4">
                    {member.role}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Three Pillars ────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[var(--background-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.theme}
                  className="bg-white rounded-xl p-8 text-center border border-[var(--border-gray)] shadow-sm"
                >
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <p className="text-[var(--text-primary)] text-lg italic mb-4 leading-relaxed">
                    &ldquo;{pillar.quote}&rdquo;
                  </p>
                  <p className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-wider">
                    {pillar.theme}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Kevin Quote ──────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote>
              <p className="text-2xl md:text-3xl font-medium italic text-white mb-6 leading-relaxed">
                <span className="text-[var(--brand-yellow)]">&ldquo;</span>I
                started flipping houses because I wanted to restore
                neighborhoods. What I realized is that what I was actually
                rehabbing was myself.
                <span className="text-[var(--brand-yellow)]">&rdquo;</span>
              </p>
              <footer className="text-lg text-gray-400 font-medium">
                &mdash; Kevin Dairaghi, Founder
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── Section 5: Join the Team + Sign-off ─────────────────── */}
        <section className="py-16 md:py-24 bg-black text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Are you exceptional? Want to join our team?
            </h2>
            <Link
              href="/book"
              className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] mb-16"
            >
              Time to Talk
            </Link>

            <p className="text-2xl md:text-3xl font-bold text-[var(--brand-yellow)]">
              People over profit. Every time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
