import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BrandStatement from './components/BrandStatement';
import ProcessSection from './components/ProcessSection';
import PeopleFirstMethod from './components/PeopleFirstMethod';
import MoreThanCashOffers from './components/MoreThanCashOffers';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://www.restorestl.com/#organization",
            name: "Restore STL",
            url: "https://www.restorestl.com",
            logo: "https://www.restorestl.com/og-image.png",
            image: "https://www.restorestl.com/og-image.png",
            description:
              "St. Louis real estate investment company buying houses to restore neighborhoods. Cash offers, no repairs, no fees.",
            telephone: "+1-314-736-3311",
            areaServed: {
              "@type": "City",
              name: "St. Louis",
              containedInPlace: {
                "@type": "State",
                name: "Missouri",
              },
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "St. Louis",
              addressRegion: "MO",
              addressCountry: "US",
            },
            sameAs: [
              "https://stopforeclosurestl.com",
              "https://probatehelpstl.com",
            ],
          }),
        }}
      />
      <Navigation />
      <main>
        <Hero />
        <BrandStatement />
        <ProcessSection />
        <PeopleFirstMethod />
        <MoreThanCashOffers />
      </main>
      <Footer />
    </>
  );
}
