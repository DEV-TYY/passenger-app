"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Languages, Lock, Mail, Phone, User } from "lucide-react";
import { AppButton } from "@/app/components/ui/button";
import { TextInput } from "@/app/components/ui/text-input";
import { languageSwitchLabel, translate } from "@/app/data/app-i18n";
import { localeFontFamilies } from "@/app/data/homepage-data";
import type { Locale } from "@/app/data/homepage-data";
import { registerRoleContent } from "@/app/data/mock-data";

export default function RegisterPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const content = registerRoleContent.passenger;
  const RoleIcon = content.icon;
  const t = (phrase: string) => translate(locale, phrase);

  return (
    <main className="min-h-screen bg-[#f6f7f4] text-slate-950" lang={locale} style={{ fontFamily: localeFontFamilies[locale] }}>
      <div className="grid min-h-screen lg:grid-cols-[1fr_540px]">
        <section className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
          <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: content.image }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="grid size-10 place-items-center rounded-md bg-white text-slate-950">
                <RoleIcon size={22} />
              </span>
              {t(content.label)}
            </Link>
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-emerald-300">{t(content.eyebrow)}</p>
              <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight">{t(content.title)}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">{t(content.description)}</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600">
                <ArrowLeft size={17} />
                {t("Back")}
              </Link>
              <AppButton
                type="button"
                onClick={() => setLocale(locale === "en" ? "km" : "en")}
                variant="unstyled"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700"
              >
                <Languages size={17} />
                {languageSwitchLabel[locale]}
              </AppButton>
            </div>
            <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
              <RoleIcon size={17} />
              {t(content.label)}
            </span>
            <h2 className="mt-5 text-3xl font-bold">{t("Register")}</h2>
            <p className="mt-2 text-slate-600">{t(content.description)}</p>

            <form className="mt-8 grid gap-4">
              <TextInput icon={<User size={18} className="text-slate-400" />} label={t("Name")} placeholder={t("Full name")} />
              <TextInput icon={<Phone size={18} className="text-slate-400" />} label={t("Phone")} placeholder="+1 555 000 0000" />
              <TextInput icon={<Mail size={18} className="text-slate-400" />} label={t("Email")} placeholder="name@example.com" type="email" />
              <TextInput icon={<Lock size={18} className="text-slate-400" />} label={t("Password")} placeholder={t("Create a password")} type="password" />
              <AppButton href={content.homeHref} icon={<ArrowRight size={18} />}>
                {t(content.submitLabel)}
              </AppButton>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              {t("Already have a User account?")}{" "}
              <Link href={content.loginHref} className="font-bold text-emerald-700">
                {t("Login")}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
