import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import MobileFrame from "@/components/MobileFrame";
import ToastViewport from "@/components/ToastViewport";
import OfflineBanner from "@/components/OfflineBanner";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venga",
  description: "Venga mobile — consumer crypto app prototype",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F7F2E7",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-cream text-ink antialiased">
        {/* Keyboard skip-link — invisible until focused */}
        <a href="#main" className="skip-link">Skip to content</a>
        <OfflineBanner />
        <MobileFrame>
          <main id="main" tabIndex={-1}>
            {children}
          </main>
        </MobileFrame>
        <ToastViewport />
      </body>
    </html>
  );
}
