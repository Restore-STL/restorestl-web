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
    <iframe
      src="https://calendar.app.google/aGh8hXubzC7pt6y5A"
      style={{ border: 0, width: '100%' }}
      className="h-[680px] max-md:h-[calc(100vh-120px)]"
      frameBorder="0"
      title="Book a free property consultation"
      loading="lazy"
    />
  );
}
