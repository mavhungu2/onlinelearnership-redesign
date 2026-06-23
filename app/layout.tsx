import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdScript } from "@/components/AdScript";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-5MXHKP42PE";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlinelearnership.co.za"),
  title: {
    default: "Online Learnership — South Africa's home of learnerships, internships & bursaries",
    template: "%s · Online Learnership",
  },
  description:
    "Find verified learnerships, internships, bursaries and graduate programmes across South Africa. Updated daily. Free to apply.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Online Learnership",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AdScript />
      </body>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
