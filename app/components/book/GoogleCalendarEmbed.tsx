'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function GoogleCalendarEmbed() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'book_page_viewed' });
  }, []);

  return (
    <div className="text-center py-8 px-4 space-y-4">
      <a
        href="https://calendar.app.google/aGh8hXubzC7pt6y5A"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-xl px-8 py-5 rounded-lg transition-colors min-h-[44px]"
      >
        Schedule Your Free Consultation
      </a>
      <p className="text-sm text-[var(--text-secondary)]">
        You&apos;ll be taken to Google Calendar to pick a time that works for you.
      </p>
    </div>
  );
}
