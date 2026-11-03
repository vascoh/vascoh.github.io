/**
 * Global site configuration.
 *
 * ⚠️ PLACEHOLDERS: every value set to `null` is intentionally unconfigured.
 * Never invent contacts or profile URLs — fill these in with real data only.
 */
export const site = {
  name: "Vasco Henriques",
  headline: "Senior BI Consultant | SQL Server & Power BI Specialist | Data & AI Solutions",
  location: "Lisboa, Portugal",
  /** Public URL of the deployed website (used for SEO, sitemap and Open Graph). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://vascoh.github.io").replace(/\/$/, ""),

  /** Professional photo. Place the file in /public/images and set e.g. "/images/vasco-henriques.jpg". */
  photo: null as string | null,

  contact: {
    /** TODO: professional email address. */
    email: null as string | null,
    /** TODO: full LinkedIn profile URL. */
    linkedin: null as string | null,
    /** TODO: full GitHub profile URL. */
    github: null as string | null,
  },

  /** CV files. Place PDFs in /public/cv and set the paths, e.g. "/cv/vasco-henriques-cv-en.pdf". */
  cv: {
    en: null as string | null,
    pt: null as string | null,
  },

  /** Shows the "Open to opportunities" badge. */
  openToWork: true,
};
