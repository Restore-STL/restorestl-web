import Navigation from '../components/Navigation';
import HeroSection from '../components/sell/HeroSection';
import TimeMoneyEnergy from '../components/sell/TimeMoneyEnergy';
import TwoPathComparison from '../components/sell/TwoPathComparison';
import Footer from '../components/Footer';
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
              Ready to Talk?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              No pressure. No obligation. Just a conversation.
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
      </main>
      <Footer />
    </>
  );
}
