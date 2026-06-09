import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display, DM_Sans } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  title: "Extrabits Junior | IT Coaching",
  description: "Learn Computer Skills & Coding From Class 8th to 12th",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#050c18] text-text-dark font-sans overflow-x-hidden">
        <LenisProvider>
          <NoiseOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
