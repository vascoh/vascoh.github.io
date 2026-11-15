import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/content/site";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a14" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const pt = lang === "pt";
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — Senior BI Consultant | SQL Server & Power BI`,
      template: `%s · ${site.name}`,
    },
    description: pt
      ? "Senior BI Consultant em Lisboa, especialista em SQL Server e Power BI. Business Intelligence, performance tuning, automatização e soluções digitais com IA."
      : "Senior BI Consultant in Lisbon, specialised in SQL Server and Power BI. Business Intelligence, performance tuning, automation and AI-assisted digital solutions.",
    authors: [{ name: site.name }],
    creator: site.name,
    keywords: ["Vasco Henriques", "Business Intelligence", "Power BI", "SQL Server", "T-SQL", "DAX", "Performance Tuning", "BI Consultant", "Lisboa", "LLM"],
    icons: { icon: "/icon.svg" },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Senior Business Intelligence Consultant",
    worksFor: { "@type": "Organization", name: "Noesis" },
    address: { "@type": "PostalAddress", addressLocality: "Lisboa", addressCountry: "PT" },
    url: site.url,
    knowsAbout: ["Business Intelligence", "SQL Server", "Power BI", "DAX", "Data Modeling", "ETL", "Performance Tuning", "Large Language Models"],
    sameAs: [site.contact.linkedin, site.contact.github].filter(Boolean),
  };

  return (
    <html lang={lang === "pt" ? "pt-PT" : "en"} className={`dark ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          {dict.nav.skip}
        </a>
        <Header lang={lang} dict={dict.nav} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
