import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Join the Buyers List | Restore STL',
  description:
    'Get on Kevin’s buyers list at Restore STL. Call (314) 736-3311 and we’ll fine-tune your buy box together.',
};

export default function JoinPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-black text-white py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Join the <span className="text-[var(--brand-yellow)]">Buyers List</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              We&apos;re handling new buyer profiles by phone right now so we can fine-tune your buy box block-by-block instead of through a form.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[var(--border-gray)] bg-[var(--background-gray)] p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
                Talk to Kevin
              </h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto">
                One short call: target ZIPs, no-fly streets, your strategy, your max price. Kevin asks the questions a form can&apos;t.
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
              <p className="mt-6 text-sm text-[var(--text-secondary)]">
                Usually 15&ndash;20 minutes. No commitment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
