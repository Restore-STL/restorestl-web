import Navigation from '../components/Navigation';
import HeroSection from '../components/sell/HeroSection';
import TimeMoneyEnergy from '../components/sell/TimeMoneyEnergy';
import TwoPathComparison from '../components/sell/TwoPathComparison';
import Footer from '../components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Your House Fast | Free Instant Home Valuation | Restore STL',
  description:
    'Get a cash offer on your St. Louis home in minutes. No repairs, no fees, no hassle.',
};

export default function SellPage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TimeMoneyEnergy />
        <TwoPathComparison />
        {/* Sell CTA */}
        <section className="py-16 md:py-24 bg-black text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Time to Talk
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              No pressure. No obligation. Just a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/book"
                className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
              >
                Book a Call
              </Link>
              <a
                href="tel:+13147363311"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-[var(--brand-yellow)] font-semibold text-lg transition-colors duration-200"
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
