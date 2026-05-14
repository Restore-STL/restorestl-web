import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.restorestl.com"),
  title: "Restore STL | Sell Your House Fast in St. Louis",
  description:
    "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle. Restore STL buys houses in any condition — close on your timeline.",
  alternates: {
    canonical: "https://www.restorestl.com",
  },
  robots: process.env.VERCEL_ENV !== "production"
    ? { index: false, follow: false }
    : undefined,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Restore STL | Sell Your House Fast in St. Louis",
    description:
      "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle.",
    url: "https://www.restorestl.com",
    siteName: "Restore STL",
    images: [
      {
        url: "https://www.restorestl.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Restore STL \u2014 we buy houses to restore neighborhoods",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restore STL | Sell Your House Fast in St. Louis",
    description:
      "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle.",
    images: ["https://www.restorestl.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
