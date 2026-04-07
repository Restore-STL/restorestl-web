import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capital Partner Application — Restore STL",
  robots: { index: false, follow: false },
};

export default function CapitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
