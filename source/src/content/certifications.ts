import type { L } from "@/i18n/config";

/** Certifications — source: official CV. `official` = vendor certification; `course` = course/training. */
export interface Certification {
  name: L;
  issuer: string;
  type: "official" | "course";
  year: string | null;
  url: string | null;
  code?: string;
}

export const certifications: Certification[] = [
  {
    name: {
      en: "Analyzing and Visualizing Data with Microsoft Power BI",
      pt: "Analyzing and Visualizing Data with Microsoft Power BI",
    },
    issuer: "Microsoft",
    type: "official",
    year: "2024–2025",
    url: null, // add the Microsoft Learn credential URL if available
  },
  { name: { en: "Microsoft Office Master 2016", pt: "Microsoft Office Master 2016" }, issuer: "Microsoft", type: "official", year: "2016", url: null },
  {
    name: { en: "Microsoft Office Specialist: Excel 2016 Expert", pt: "Microsoft Office Specialist: Excel 2016 Expert" },
    issuer: "Microsoft",
    type: "official",
    year: "2016",
    url: null,
  },
  {
    name: { en: "Microsoft Office Specialist: Word 2016 Expert", pt: "Microsoft Office Specialist: Word 2016 Expert" },
    issuer: "Microsoft",
    type: "official",
    year: "2016",
    url: null,
  },
  { name: { en: "Digital Marketing", pt: "Marketing Digital" }, issuer: "Google", type: "official", year: "2017", url: null },
];
