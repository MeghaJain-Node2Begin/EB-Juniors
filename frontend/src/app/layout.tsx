import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display, DM_Sans } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import { LocalBusinessSchema, WebSiteSchema, BUSINESS } from "@/components/seo/JsonLd";
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
  title: {
    default: "EB Juniors — Best Computer & Coding Classes in Surat | Class 6–12",
    template: "%s | EB Juniors Surat",
  },
  description:
    "EB Juniors offers the best computer and coding classes in Surat for school students (Class 6 to 12). Learn Java, Python, Web Development, and Computer Fundamentals with expert mentors at City Light, Surat.",
  keywords: [
    "computer classes in Surat",
    "coding classes in Surat",
    "Java classes in Surat",
    "Python classes in Surat",
    "web development classes Surat",
    "computer tuition Surat",
    "IT classes for school students Surat",
    "coding institute Surat",
    "EB Juniors",
    "Extrabits Junior",
    "computer coaching Surat",
    "programming classes for kids Surat",
  ],
  authors: [{ name: "EB Juniors" }],
  creator: "EB Juniors",
  publisher: "EB Juniors",
  metadataBase: new URL(BUSINESS.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BUSINESS.url,
    siteName: "EB Juniors",
    title: "EB Juniors — Best Computer & Coding Classes in Surat",
    description:
      "Expert-led Java, Python, Web Development & Computer Fundamentals classes for school students (Class 6–12) in Surat, Gujarat. Enroll today!",
    images: [
      {
        url: "/logo-new.png",
        width: 200,
        height: 200,
        alt: "EB Juniors — Computer & Coding Classes in Surat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EB Juniors — Best Computer & Coding Classes in Surat",
    description:
      "Expert-led Java, Python, Web Development & Computer Fundamentals classes for school students (Class 6–12) in Surat, Gujarat.",
    images: ["/logo-new.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
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
      <head>
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-screen bg-[#050c18] text-text-dark font-sans overflow-x-hidden">
        <LenisProvider>
          <NoiseOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
