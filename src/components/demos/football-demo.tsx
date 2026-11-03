"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** 100% synthetic data — fictional teams, used only to illustrate the dashboard concept. */
const teams = [
  { team: "Atlântico FC", gf: 68, ga: 24, pts: 81, poss: 61 },
  { team: "Serra United", gf: 61, ga: 30, pts: 74, poss: 57 },
  { team: "Ribeira SC", gf: 55, ga: 33, pts: 66, poss: 54 },
  { team: "Vale Verde", gf: 47, ga: 38, pts: 55, poss: 51 },
  { team: "Porto Novo", gf: 44, ga: 45, pts: 48, poss: 49 },
  { team: "Castelo AC", gf: 39, ga: 47, pts: 42, poss: 47 },
  { team: "Lezíria FC", gf: 33, ga: 52, pts: 35, poss: 45 },
  { team: "Norte Real", gf: 29, ga: 60, pts: 27, poss: 42 },
];

type Metric = "pts" | "gd" | "gf" | "poss";

const labels: Record<Locale, Record<Metric, string>> = {
  en: { pts: "Points", gd: "Goal difference", gf: "Goals scored", poss: "Possession %" },
  pt: { pts: "Pontos", gd: "Diferença de golos", gf: "Golos marcados", poss: "Posse de bola %" },
};

const dax: Record<Metric, string> = {
  pts: "Points =\nSUMX ( Matches, Matches[Points] )",
  gd: "Goal Difference =\n[Goals For] - [Goals Against]",
  gf: "Goals For =\nSUM ( Matches[GoalsFor] )",
  poss: "Avg Possession % =\nAVERAGE ( Matches[Possession] )",
};

export function FootballDemo({ lang }: { lang: Locale }) {
  const [metric, setMetric] = useState<Metric>("pts");
  const rows = teams
    .map((t) => ({ team: t.team, value: metric === "gd" ? t.gf - t.ga : t[metric] }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(...rows.map((r) => Math.abs(r.value)));

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-muted">
          {lang === "en" ? "Synthetic league table — fictional teams and values." : "Classificação sintética — equipas e valores fictícios."}
        </p>
        <div role="radiogroup" aria-label={lang === "en" ? "Indicator" : "Indicador"} className="flex flex-wrap gap-1.5">
          {(Object.keys(labels[lang]) as Metric[]).map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={metric === m}
              onClick={() => setMetric(m)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                metric === m ? "border-accent bg-accent text-accent-fg" : "border-border text-fg-muted hover:text-fg",
              )}
            >
              {labels[lang][m]}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_16rem]">
        <ul className="space-y-2.5" aria-label={labels[lang][metric]}>
          {rows.map((r, i) => (
            <li key={r.team} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="truncate text-fg">
                <span className="mr-2 font-mono text-xs text-fg-subtle">{i + 1}</span>
                {r.team}
              </span>
              <span className="h-2.5 overflow-hidden rounded-full bg-surface-strong ring-1 ring-border">
                <span
                  className={cn(
                    "block h-full rounded-full transition-[width] duration-500",
                    r.value < 0 ? "bg-rose-500/70" : "bg-gradient-to-r from-accent to-accent-2",
                  )}
                  style={{ width: `${(Math.abs(r.value) / max) * 100}%` }}
                />
              </span>
              <span className="text-right font-mono tabular-nums text-fg-muted">{r.value > 0 && metric === "gd" ? `+${r.value}` : r.value}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-border bg-bg-elev p-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">DAX</p>
          <pre className="mt-2 overflow-x-auto whitespace-pre font-mono text-xs leading-relaxed text-fg">{dax[metric]}</pre>
          <p className="mt-3 text-xs text-fg-subtle">
            {lang === "en" ? "Illustrative measure — simplified example." : "Medida ilustrativa — exemplo simplificado."}
          </p>
        </div>
      </div>
    </div>
  );
}
