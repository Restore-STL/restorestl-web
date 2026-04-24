import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
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
  title: "Restore STL | Sell Your House Fast in St. Louis",
  description:
    "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle. Restore STL buys houses in any condition — close on your timeline.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Restore STL | Sell Your House Fast in St. Louis",
    description:
      "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle.",
    url: "https://restorestl.com",
    siteName: "Restore STL",
    images: [
      {
        url: "https://restorestl.com/og-image.png",
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
    images: ["https://restorestl.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7DX6C4X');`,
        }}
      />
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7DX6C4X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
