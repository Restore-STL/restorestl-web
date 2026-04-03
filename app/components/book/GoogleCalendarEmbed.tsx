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
      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0TyX0wJqTUcySPOm1Xk-8MWXq_yejuso6AURir0fuYYW1VTXmr0rOe_J7V-uhaZbSo2ioBIERf?gv=true"
      style={{ border: 0, width: '100%' }}
      className="h-[680px] max-md:h-[calc(100vh-120px)]"
      title="Book a free property consultation"
      loading="lazy"
    />
  );
}
