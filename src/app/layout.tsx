import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dream Foundation",
    template: " | Dream Foundation"
  },
  description: "Dream Foundation is dedicated to providing quality education and opportunities to help individuals achieve their dreams. Join our comprehensive programs and community initiatives.",
  authors: [{ name: "Dream Foundation" }],
  // creator: "Dream Foundation",
  // publisher: "Dream Foundation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://dreamfoundation.in/",
    siteName: "Dream Foundation",
    title: "Dream Foundation - Education & Opportunities",
    description: "Dream Foundation is dedicated to providing quality education and opportunities to help individuals achieve their dreams.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<Header />

        {children}
        <Footer />
      </body>
    </html>
  );
}
