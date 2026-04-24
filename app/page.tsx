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
