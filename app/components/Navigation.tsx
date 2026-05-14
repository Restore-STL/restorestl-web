'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Simple text only */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold">
              <span className="text-white">Restore </span>
              <span className="text-[var(--brand-yellow)]">STL</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-[var(--brand-yellow)] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-[var(--brand-yellow)] transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              href="/sell"
              className="text-white hover:text-[var(--brand-yellow)] transition-colors duration-200 font-medium"
            >
              Sell
            </Link>
            <a
              href="tel:+13147363311"
              className="bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-semibold px-5 py-2 rounded-lg transition-all duration-200"
            >
              Call (314) 736-3311
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white hover:text-[var(--brand-yellow)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t border-white/10">
            <Link
              href="/"
              className="block text-white hover:text-[var(--brand-yellow)] transition-colors duration-200 font-medium py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-white hover:text-[var(--brand-yellow)] transition-colors duration-200 font-medium py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/sell"
              className="block text-white hover:text-[var(--brand-yellow)] transition-colors duration-200 font-medium py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <a
              href="tel:+13147363311"
              className="block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Call (314) 736-3311
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
