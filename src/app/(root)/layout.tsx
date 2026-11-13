import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Vasco Henriques — Senior BI Consultant",
  robots: { index: false, follow: true },
};

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
