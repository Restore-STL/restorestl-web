import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* CTA Section */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Talk?
          </h3>
          <Link
            href="/book"
            className="inline-block text-[var(--brand-yellow)] hover:text-[var(--brand-yellow-hover)] font-medium text-lg underline underline-offset-4 transition-colors duration-200"
          >
            Time to Talk
          </Link>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-white/20 mx-auto mb-8" />

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          <Link
            href="/about"
            className="text-gray-300 hover:text-[var(--brand-yellow)] transition-colors duration-200 text-sm"
          >
            About
          </Link>
          <span className="text-gray-600 text-sm">&middot;</span>
          <Link
            href="/book"
            className="text-gray-300 hover:text-[var(--brand-yellow)] transition-colors duration-200 text-sm"
          >
            Book a Call
          </Link>
          <span className="text-gray-600 text-sm">&middot;</span>
          <Link
            href="/privacy"
            className="text-gray-300 hover:text-[var(--brand-yellow)] transition-colors duration-200 text-sm"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Phone */}
        <div className="mb-6">
          <a
            href="tel:+13147363311"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[var(--brand-yellow)] transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (314) 736-3311
          </a>
        </div>

        {/* Sister sites */}
        <div className="mb-4">
          <p className="text-gray-400 text-xs">
            Part of the Restore STL family:{' '}
            <a
              href="https://probatehelpstl.com"
              rel="noopener"
              className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200"
            >
              Probate Help STL
            </a>
            <span className="text-gray-600"> &middot; </span>
            <a
              href="https://stopforeclosurestl.com"
              rel="noopener"
              className="text-gray-400 hover:text-[var(--brand-yellow)] transition-colors duration-200"
            >
              Stop Foreclosure STL
            </a>
          </p>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          Restore STL &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
