import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "You're All Set! | Restore STL",
  description:
    'Your consultation with Kevin is confirmed. Check your email for the calendar invite.',
};

export default function BookingConfirmedPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="py-24 md:py-32 bg-[var(--background-gray)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Success icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              You&apos;re all set!
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              Kevin will call you at your scheduled time. If you need to
              reschedule, check your email for the calendar invite.
            </p>

            {/* Kevin's direct line */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border-gray)] mb-8 inline-block">
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                Need to reach Kevin directly?
              </p>
              <a
                href="tel:+13147363311"
                className="inline-flex items-center gap-2 text-lg font-bold text-[var(--text-primary)] hover:text-[var(--brand-yellow)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (314) 736-3311
              </a>
            </div>

            <div>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-8 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
