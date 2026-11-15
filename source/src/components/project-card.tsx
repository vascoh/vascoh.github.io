import Link from "next/link";
import { ArrowUpRight, ExternalLink, FlaskConical } from "lucide-react";
import Image from "next/image";
import { coverOf, type Project } from "@/content/projects";
import { href, tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { projectIcons } from "./icons";
import { StatusBadge } from "./status-badge";

/**
 * Whole card links to the case study (stretched link on the title).
 * Decorative content ignores pointer events so clicks reach the stretched link;
 * the external website link sits above it (z-10) and opens in a new tab.
 */
export function ProjectCard({ project, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  const Icon = projectIcons[project.icon];
  const link = href(lang, `projects/${project.slug}`);
  const site = project.url || project.previewUrl;
  return (
    <article className="glass card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-60"
      />
      <div className="pointer-events-none relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden border-b border-border">
        <Image
          src={coverOf(project)}
          alt=""
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
      </div>
      <div className="pointer-events-none flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.personal && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[0.7rem] text-fg-subtle">
              <FlaskConical className="size-3" aria-hidden />
              {dict.projects.personal}
            </span>
          )}
          <StatusBadge status={project.status} dict={dict} />
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
        <Link
          href={link}
          className="rounded-sm after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
        >
          {tr(project.title, lang)}
        </Link>
      </h3>
      <p className="pointer-events-none mt-2 line-clamp-4 text-sm leading-relaxed text-fg-muted">{tr(project.summary, lang)}</p>
      {site && (
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-3 inline-flex w-fit items-center gap-1.5 rounded-md font-mono text-xs text-accent-2 underline-offset-4 hover:underline"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          {new URL(site).hostname}
        </a>
      )}
      <ul className="pointer-events-none mt-5 flex flex-wrap gap-1.5" aria-label={dict.projects.technologies}>
        {project.tags.map((t) => (
          <li key={t} className="rounded-md bg-surface-strong/60 px-2 py-0.5 font-mono text-[0.7rem] text-fg-subtle ring-1 ring-border">
            {t}
          </li>
        ))}
      </ul>
      <div className="pointer-events-none mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
        {project.kind === "bi" ? dict.projects.readCase : dict.projects.viewProject}
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-x-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </div>
    </article>
  );
}
