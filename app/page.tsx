"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Car,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { AppButton } from "@/app/components/ui/button";
import {
  homepageCopy,
  localeFontFamilies,
  quickActions,
} from "@/app/data/homepage-data";
import type { HomepageCopy, Locale } from "@/app/data/homepage-data";
import { homepageImpact, homepageNews, homepageServiceGroups } from "@/app/data/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = homepageCopy[locale];
  const activeServices = homepageServiceGroups.find((group) => group.audience === "passenger") ?? homepageServiceGroups[0];
  const translatedServices = activeServices.services.map((service, index) => ({
    ...service,
    title: t.services.cards[index]?.[0] ?? service.title,
    text: t.services.cards[index]?.[1] ?? service.text,
  }));
  const translatedImpact = homepageImpact.map((item, index) => ({ ...item, label: t.charging.impact[index] ?? item.label }));
  const translatedNews = homepageNews.map((item, index) => ({
    ...item,
    title: t.highlights.cards[index]?.[0] ?? item.title,
    text: t.highlights.cards[index]?.[1] ?? item.text,
  }));
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.28], [0, 90]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.22], [0, -36]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  return (
    <main className="min-h-screen bg-[#f4f7f4] text-slate-950" lang={locale} style={{ fontFamily: localeFontFamilies[locale] }}>
      <Header locale={locale} onLocaleChange={() => setLocale(locale === "en" ? "km" : "en")} t={t} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{
            y: heroImageY,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2200&q=85')",
          }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92),rgba(2,6,23,0.76),rgba(2,6,23,0.48))]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-84px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <motion.div
            className="max-w-2xl"
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            variants={staggerGroup}
            initial="hidden"
            animate="visible"
          >
            <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-100 shadow-sm backdrop-blur-md">
              <Sparkles size={17} />
              {t.hero.eyebrow}
            </p>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="mt-6 text-5xl font-bold leading-[1.01]  tracking-normal sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              {t.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppButton href="/login?role=passenger" variant="light" className="px-5" icon={<ArrowRight size={18} />}>
                {t.hero.login}
              </AppButton>
              <AppButton href="/register?role=passenger" variant="outline" className="px-5">
                {t.hero.create}
              </AppButton>
            </motion.div>

            <motion.div variants={staggerGroup} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {t.hero.stats.map(([value, label]) => (
                <motion.div key={label} variants={fadeUp} transition={{ duration: 0.55, ease: "easeOut" }} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-normal text-slate-300">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}>
            <HeroShowcase t={t} />
          </motion.div>
        </div>
      </section>

      <motion.section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={staggerGroup}>
        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="mx-auto grid max-w-7xl gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-950/10 md:grid-cols-4">
          {quickActions.map((item) => (
            <motion.div key={item.key} variants={fadeUp} transition={{ duration: 0.45, ease: "easeOut" }}>
              <Link
                href={item.href}
                className="group flex min-h-20 items-center justify-between rounded-md border border-transparent bg-slate-50 px-4 py-3 font-bold transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md"
              >
                <span className="inline-flex items-center gap-3">
                  <span className={`grid size-11 place-items-center rounded-md ${item.tone}`}>
                    <item.icon size={21} />
                  </span>
                  {t.quickActions[item.key]}
                </span>
                <ArrowRight size={17} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-accent" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerGroup}>
        <div className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-normal text-brand-accent">{t.services.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{t.services.title}</h2>
            <p className="mt-5 leading-8 text-slate-600">
              {t.services.description}
            </p>
            <AppButton href="/passenger" className="mt-6" icon={<ArrowRight size={18} />}>
              {t.services.cta}
            </AppButton>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-normal text-slate-500">{t.services.groupEyebrow}</p>
            <h3 className="mt-2 text-3xl font-bold">{t.services.groupTitle}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {translatedServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerGroup}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
            <p className="text-sm font-bold uppercase tracking-normal text-brand-accent">{t.charging.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{t.charging.title}</h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-600">
              {t.charging.description}
            </p>
            <motion.div className="mt-8 grid gap-3 sm:grid-cols-2" variants={staggerGroup}>
              {translatedImpact.map((item) => (
                <motion.div key={item.label} variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }} className="rounded-lg border border-slate-200 bg-[#f7f9f6] p-5 shadow-sm">
                  <p className="text-3xl font-bold text-slate-950">{item.value}</p>
                  <p className="mt-2 text-sm font-bold text-slate-500">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="overflow-hidden rounded-lg bg-slate-950 text-white shadow-2xl shadow-slate-950/25">
            <div className="relative min-h-[520px]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=85')",
                }}
              />
              <div className="absolute inset-0 bg-slate-950/45" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-bold uppercase tracking-normal text-emerald-300">{t.charging.cardEyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold">{t.charging.cardTitle}</h3>
                <div className="mt-5 grid gap-3">
                  {t.charging.stationRows.map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur-md">
                      {item}
                      <BatteryCharging size={18} className="text-emerald-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="updates" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerGroup}>
        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-brand-accent">{t.highlights.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{t.highlights.title}</h2>
          </div>
          <AppButton href="/passenger/charging" variant="dark" icon={<ArrowRight size={18} />}>
            {t.highlights.cta}
          </AppButton>
        </motion.div>
        <motion.div className="mt-8 grid gap-4 md:grid-cols-3" variants={staggerGroup}>
          {translatedNews.map((item) => (
            <motion.article key={item.title} variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
              <span className="grid size-12 place-items-center rounded-md bg-emerald-50 text-brand-accent">
                <item.icon size={23} />
              </span>
              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="bg-slate-950 text-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-emerald-300">{t.ready.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight">{t.ready.title}</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <AppButton href="/login?role=passenger" variant="light">
              {t.ready.login}
            </AppButton>
            <AppButton href="/register?role=passenger" variant="outline">{t.ready.create}</AppButton>
          </div>
        </div>
      </motion.section>

      <Footer t={t} />
    </main>
  );
}

function HeroShowcase({ t }: { t: HomepageCopy }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -left-5 top-10 hidden rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white shadow-xl backdrop-blur-md lg:block">
        <span className="inline-flex items-center gap-2">
          <MapPin size={16} className="text-emerald-300" />
          {t.showcase.pickup}
        </span>
      </div>
      <div className="absolute -right-4 bottom-16 hidden rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white shadow-xl backdrop-blur-md lg:block">
        <span className="inline-flex items-center gap-2">
          <Clock3 size={16} className="text-emerald-300" />
          {t.showcase.arriving}
        </span>
      </div>

      <div className="relative rounded-lg border border-white/20 bg-white/95 p-3 text-slate-950 shadow-2xl shadow-slate-950/35 backdrop-blur">
        <div className="grid gap-3 sm:grid-cols-[1fr_156px]">
          <div
            className="relative min-h-72 overflow-hidden rounded-md bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=85')",
            }}
          >
            <div className="absolute inset-0 bg-slate-950/10" />
            <div className="absolute bottom-3 left-3 right-3 rounded-md border border-white/40 bg-white/90 p-3 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{t.showcase.routeLabel}</p>
                  <p className="mt-1 font-bold">{t.showcase.route}</p>
                </div>
                <span className="rounded-md bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">$12</span>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <InsightTile icon={ShieldCheck} label={t.showcase.verified} value="4.96" />
            <InsightTile icon={WalletCards} label={t.showcase.wallet} value="$84" />
            <InsightTile icon={BatteryCharging} label={t.showcase.chargeAi} value="8" />
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          <UserHeroSummary t={t} />
        </div>
      </div>
    </div>
  );
}

function InsightTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-950 p-4 text-white shadow-sm">
      <Icon size={19} className="text-emerald-300" />
      <p className="mt-5 text-xs font-bold uppercase tracking-normal text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function UserHeroSummary({ t }: { t: HomepageCopy }) {
  const icons = [Car, Package, BatteryCharging, CreditCard];

  return (
    <>
      {t.showcase.rows.map(([title, detail, value], index) => (
        <SummaryRow key={title} icon={icons[index]} title={title} detail={detail} value={value} />
      ))}
      <AppButton href="/passenger/charging" variant="dark" icon={<ArrowRight size={18} />}>
        {t.showcase.cta}
      </AppButton>
    </>
  );
}

function SummaryRow({ icon: Icon, title, detail, value }: { icon: LucideIcon; title: string; detail: string; value: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-slate-100 bg-slate-50 p-3 shadow-sm">
      <span className="grid size-10 place-items-center rounded-md bg-white text-brand-accent shadow-sm">
        <Icon size={19} />
      </span>
      <span>
        <span className="block text-sm font-bold">{title}</span>
        <span className="mt-1 block text-xs text-slate-500">{detail}</span>
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

function ServiceCard({ href, icon: Icon, title, text }: { href: string; icon: LucideIcon; title: string; text: string }) {
  return (
    <Link href={href} className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-[#fbfdfb] hover:shadow-xl">
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-md bg-emerald-50 text-brand-accent transition group-hover:bg-brand group-hover:text-white">
          <Icon size={23} />
        </span>
        <ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-accent" />
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </Link>
  );
}
