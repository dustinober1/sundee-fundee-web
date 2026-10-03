import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// Cloudflare Web Analytics beacon token. Vercel Analytics records nothing on
// the Cloudflare deployment, so page-view analytics come from Cloudflare
// instead. Create the token in the Cloudflare dashboard (Web Analytics) and
// set it as a build-time env var — NEXT_PUBLIC_* values inline at build.
const cloudflareWebAnalyticsToken = process.env[
  "NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN"
] as string | undefined;

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0d1a40",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        {children}
        {cloudflareWebAnalyticsToken ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: cloudflareWebAnalyticsToken,
            })}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
