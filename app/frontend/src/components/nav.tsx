"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/jobs", label: "Vagas" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/profile", label: "Perfil" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-14 items-center gap-1 border-b border-slate-200 px-6">
      <span className="mr-6 text-sm font-semibold">AI Job Hunter</span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100",
            pathname === link.href && "bg-slate-100 font-medium text-slate-900"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
