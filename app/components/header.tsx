"use client";

import Link from "next/link";
import { Languages, Menu, Navigation } from "lucide-react";
import { AppButton } from "@/app/components/ui/button";
import type { HomepageCopy, Locale } from "@/app/data/homepage-data";

export function Header({ locale, onLocaleChange, t }: { locale: Locale; onLocaleChange: () => void; t: HomepageCopy }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-slate-950">
          <span className="grid size-10 place-items-center rounded-md bg-brand text-white shadow-sm shadow-emerald-900/25">
            <Navigation size={22} />
          </span>
          MovePlus
        </Link>
        <div className="hidden items-center gap-8 text-sm font-bold text-brand-accent md:flex">
          <a href="#services" className="transition hover:text-brand-accent">
            {t.nav.services}
          </a>
          <a href="#updates" className="transition hover:text-brand-accent">
            {t.nav.highlights}
          </a>

          <Link href="/login?role=passenger" className="transition hover:text-brand-accent">
            {t.nav.login}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <AppButton
            type="button"
            onClick={onLocaleChange}
            variant="unstyled"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 hover:border-brand hover:text-brand-accent"
            aria-label={`Switch to ${locale === "en" ? "Khmer" : "English"}`}
          >
            <Languages size={17} />
            {t.languageLabel}
          </AppButton>
          <AppButton href="/register?role=passenger" variant="primary" className="hidden h-10 px-4 text-sm sm:inline-flex">
            {t.nav.signup}
          </AppButton>
          <AppButton type="button" variant="unstyled" className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-700 hover:border-brand hover:bg-brand hover:text-white md:hidden" aria-label={t.nav.openMenu}>
            <Menu size={20} />
          </AppButton>
        </div>
      </nav>
    </header>
  );
}
