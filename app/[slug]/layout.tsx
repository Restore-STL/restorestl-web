import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function NeighborhoodLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
