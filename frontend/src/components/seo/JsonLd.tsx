import React from "react";

/* ──────────────────────────────────────────────
 * Reusable JSON-LD Schema components for SEO
 * Drop these into any page's <head> via Next.js metadata
 * or render them directly in the page body.
 * ────────────────────────────────────────────── */

// ─── Shared business constants ───────────────
export const BUSINESS = {
  name: "EB Juniors",
  legalName: "Extrabits Junior",
  url: "https://www.ebjuniors.com",
  telephone: "+919510990292",
  telephoneFormatted: "+91 95109 90292",
  email: "extrabitsclasses@gmail.com",
  address: {
    street: "F-21, Agresen Point, Beside Agresen Bhavan",
    locality: "City Light",
    city: "Surat",
    state: "Gujarat",
    postalCode: "395007",
    country: "IN",
  },
  geo: {
    latitude: "21.1565",
    longitude: "72.7714",
  },
  social: {
    facebook: "https://www.facebook.com/ebjuniors",
    instagram: "https://www.instagram.com/ebjuniors",
    youtube: "https://www.youtube.com/@ebjuniors",
    linkedin: "https://www.linkedin.com/company/ebjuniors",
  },
} as const;

// ─── Generic JSON-LD wrapper ──────────────────
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── LocalBusiness + EducationalOrganization ──
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    description:
      "EB Juniors is Surat's premier computer and coding institute for school students from Class 6 to 12. We offer expert-led courses in Java, Python, Web Development, Computer Fundamentals, and academic IT education. Located in City Light, Surat, Gujarat, we help young learners master real-world tech skills through hands-on projects and practical learning.",
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹₹",
    image: `${BUSINESS.url}/logo-new.png`,
    logo: `${BUSINESS.url}/logo-new.png`,
    sameAs: [
      BUSINESS.social.facebook,
      BUSINESS.social.instagram,
      BUSINESS.social.youtube,
      BUSINESS.social.linkedin,
    ],
    areaServed: {
      "@type": "City",
      name: "Surat",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Computer & Coding Courses",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Programming Courses",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Java Programming for School Students",
                description:
                  "Learn Java programming fundamentals designed for Class 8-12 students in Surat.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Python Programming for Beginners",
                description:
                  "Beginner-friendly Python coding course for school students in Surat, Gujarat.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Web Development",
                description:
                  "Learn HTML, CSS, JavaScript and build real websites. Designed for young learners in Surat.",
              },
            },
          ],
        },
      ],
    },
  };

  return <JsonLd data={data} />;
}

// ─── WebSite schema (for sitelinks searchbox) ─
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    url: BUSINESS.url,
  };

  return <JsonLd data={data} />;
}

// ─── Course schema ────────────────────────────
interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  level?: string;
  duration?: string;
}

export function CourseSchema({
  name,
  description,
  url,
  level = "Beginner",
  duration,
}: CourseSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    provider: {
      "@type": "EducationalOrganization",
      name: BUSINESS.name,
      sameAs: BUSINESS.url,
    },
    educationalLevel: level,
    inLanguage: ["English", "Hindi", "Gujarati"],
    locationCreated: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
        addressCountry: BUSINESS.address.country,
      },
    },
  };

  if (duration) {
    data.timeRequired = duration;
  }

  return <JsonLd data={data} />;
}

// ─── FAQ schema ───────────────────────────────
interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

// ─── BreadcrumbList schema ────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}
