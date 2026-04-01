import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Buy Box — Restore STL",
  robots: { index: false, follow: false },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
