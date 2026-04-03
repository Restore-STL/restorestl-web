import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Restore STL',
  description:
    'How Restore STL handles your information. Your data stays with us — no selling, no third parties.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="py-16 md:py-24 bg-[var(--background-gray)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Effective Date: February 6, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Intro */}
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              At Restore STL, we respect your privacy and are committed to
              protecting your personal information. This policy explains how we
              collect, use, and safeguard your data when you visit restorestl.com
              or use our services.
            </p>

            {/* 1. Information We Collect */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                1. Information We Collect
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                When you use our property valuation form or contact us, we may
                collect:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mb-4">
                <li>Your name, email address, and phone number</li>
                <li>Property address and details</li>
                <li>Messages or notes you share with us</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                We also automatically collect certain information when you visit
                our website:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Device and browser type</li>
                <li>IP address and approximate location</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website or search terms</li>
              </ul>
            </div>

            {/* 2. How We Use Your Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Provide property valuations and cash offers</li>
                <li>
                  Contact you about your property and potential offers
                </li>
                <li>Schedule appointments and property walkthroughs</li>
                <li>Improve our website and services</li>
                <li>Respond to your questions</li>
              </ul>
            </div>

            {/* 3. Third-Party Services */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                3. Third-Party Services
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                We use the following third-party services to operate our website
                and better serve you:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
                <li>
                  <strong className="text-[var(--text-primary)]">
                    Google Analytics
                  </strong>{' '}
                  &mdash; to understand how visitors use our website and improve
                  the experience
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">
                    Meta Pixel (Facebook)
                  </strong>{' '}
                  &mdash; to measure the effectiveness of our advertising
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">
                    Google Calendar
                  </strong>{' '}
                  &mdash; to schedule appointments with our team
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
                Each of these services has its own privacy policy. We encourage
                you to review them.
              </p>
            </div>

            {/* 4. Cookies and Tracking */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Our website uses cookies &mdash; small data files stored on your
                device &mdash; for analytics and advertising purposes. These are
                managed through Google Tag Manager and help us:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Understand which pages are most useful</li>
                <li>Measure the effectiveness of our marketing</li>
                <li>Remember your preferences</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
                You can control or disable cookies through your browser settings.
                Disabling cookies may affect some website functionality.
              </p>
            </div>

            {/* 5. How We Share Your Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                5. How We Share Your Information
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Your information stays with Restore STL. Period.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                We don&apos;t sell your data, we don&apos;t add you to marketing
                lists, and we don&apos;t share your info with third parties. The
                only person who will ever contact you is a Restore STL team
                member &mdash; someone local who actually knows your
                neighborhood.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                That&apos;s it.
              </p>
            </div>

            {/* 6. Data Retention */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                6. Data Retention
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We keep your personal information for as long as necessary to
                provide our services and comply with legal obligations. If you
                request deletion, we will remove your information unless we have
                a legal requirement to retain it.
              </p>
            </div>

            {/* 7. Your Rights */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                7. Your Privacy Rights
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                <li>Access the personal information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Disable cookies through your browser settings</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
                To exercise any of these rights, contact us using the
                information below.
              </p>
            </div>

            {/* 8. Security */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                8. Data Security
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We take reasonable measures to protect your personal information
                from unauthorized access, disclosure, or destruction. However, no
                internet transmission is completely secure, and we cannot
                guarantee absolute security.
              </p>
            </div>

            {/* 9. Changes */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We may update this policy from time to time. When we do,
                we&apos;ll update the effective date at the top of this page. We
                encourage you to review this policy periodically.
              </p>
            </div>

            {/* 10. Contact */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                10. Contact Us
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                If you have questions about this policy or how we handle your
                information, please reach out:
              </p>
              <div className="bg-[var(--background-gray)] rounded-lg p-6">
                <p className="text-[var(--text-primary)] font-semibold mb-2">
                  Restore STL
                </p>
                <p className="text-[var(--text-secondary)]">
                  St. Louis, Missouri
                </p>
                <p className="text-[var(--text-secondary)]">
                  Email:{' '}
                  <a
                    href="mailto:help@restorestl.com"
                    className="text-[var(--brand-yellow)] hover:text-[var(--brand-yellow-hover)] underline"
                  >
                    help@restorestl.com
                  </a>
                </p>
                <p className="text-[var(--text-secondary)]">
                  Phone:{' '}
                  <a
                    href="tel:+13147363311"
                    className="text-[var(--brand-yellow)] hover:text-[var(--brand-yellow-hover)] underline"
                  >
                    (314) 736-3311
                  </a>
                </p>
                <p className="text-[var(--text-secondary)]">
                  Website: restorestl.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
