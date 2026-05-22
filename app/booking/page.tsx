"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Car,
  Clock3,
  CreditCard,
  Languages,
  LocateFixed,
  MapPin,
  Navigation,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AppButton } from "@/app/components/ui/button";
import { TextInput } from "@/app/components/ui/text-input";
import { languageSwitchLabel, translate } from "@/app/data/app-i18n";
import { localeFontFamilies } from "@/app/data/homepage-data";
import type { Locale } from "@/app/data/homepage-data";
import { bookingVehicles } from "@/app/data/mock-data";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function googleDirectionsEmbedUrl(origin: string, destination: string) {
  if (!googleMapsApiKey) {
    return `https://www.google.com/maps?q=${encodeURIComponent(`${origin} Phnom Penh to ${destination} Phnom Penh`)}&output=embed`;
  }

  const params = new URLSearchParams({
    key: googleMapsApiKey,
    origin: `${origin} Phnom Penh`,
    destination: `${destination} Phnom Penh`,
    mode: "driving",
  });

  return `https://www.google.com/maps/embed/v1/directions?${params.toString()}`;
}

export default function RideBookingPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedVehicle, setSelectedVehicle] = useState(1);
  const selected = bookingVehicles[selectedVehicle];
  const t = (phrase: string) => translate(locale, phrase);

  return (
    <main className="min-h-screen bg-[#f6f7f4] text-slate-950" lang={locale} style={{ fontFamily: localeFontFamilies[locale] }}>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-700">
            <ArrowLeft size={18} />
            {t("User")}
          </Link>
          <div className="flex items-center gap-2">
            <AppButton
              type="button"
              onClick={() => setLocale(locale === "en" ? "km" : "en")}
              variant="unstyled"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700"
            >
              <Languages size={17} />
              {languageSwitchLabel[locale]}
            </AppButton>
            <AppButton href="/login?role=passenger" variant="ghost" className="px-4 py-2 text-sm">
              {t("Login")}
            </AppButton>
            <AppButton href="/register?role=passenger" variant="dark" className="px-4 py-2 text-sm">
              {t("Sign up")}
            </AppButton>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
        <aside className="grid gap-4">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-normal text-emerald-700">{t("Ride booking")}</p>
            <h1 className="mt-2 text-3xl font-bold">{t("Where are you going?")}</h1>
            <p className="mt-2 text-slate-600">{t("Set your route, compare vehicle cards, and confirm a transparent fare.")}</p>

            <form className="mt-6 grid gap-4">
              <TextInput icon={<LocateFixed size={18} className="text-emerald-600" />} label={t("Pickup")} placeholder={t("Current location")} defaultValue={t("Central Market")} />
              <TextInput icon={<MapPin size={18} className="text-rose-500" />} label={t("Destination")} placeholder={t("Where to?")} defaultValue={t("Riverside Park")} />
            </form>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{t("Choose vehicle")}</h2>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">3.8 mi</span>
            </div>
            <div className="mt-4 grid gap-3">
              {bookingVehicles.map((vehicle) => (
                <AppButton
                  type="button"
                  key={vehicle.name}
                  onClick={() => setSelectedVehicle(bookingVehicles.indexOf(vehicle))}
                  variant="unstyled"
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border p-4 text-left transition ${
                    selected.name === vehicle.name ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="grid size-11 place-items-center rounded-md bg-slate-950 text-white">
                    <Car size={20} />
                  </span>
                  <span>
                    <span className="block font-bold">{t(vehicle.name)}</span>
                    <span className="mt-1 block text-sm text-slate-500">{t(vehicle.detail)}</span>
                    <span className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Users size={14} />
                        {t(`${vehicle.seats} seats`)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={14} />
                        {vehicle.eta}
                      </span>
                    </span>
                  </span>
                  <span className="font-bold">{vehicle.fare}</span>
                </AppButton>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">{t("Fare estimation")}</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <Row label={t("Base fare")} value="$3.20" />
              <Row label={t("Distance")} value={selected.name === "Economy" ? "$4.10" : selected.name === "Standard" ? "$6.30" : "$10.80"} />
              <Row label={t("Time")} value={selected.name === "Economy" ? "$1.10" : selected.name === "Standard" ? "$2.70" : "$4.50"} />
              <div className="border-t border-slate-200 pt-3">
                <Row label={t("Estimated total")} value={selected.fare} strong />
              </div>
            </div>
            <AppButton type="button" className="mt-5 w-full">
              {t("Book")} {t(selected.name)}
            </AppButton>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
              <ShieldCheck size={16} />
              {t("Fare may update if route or demand changes")}
            </p>
          </div>
        </aside>

        <section className="min-h-[680px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="relative h-full min-h-[680px] bg-slate-200">
            <iframe
              title={t("Google map for selected ride booking route")}
              src={googleDirectionsEmbedUrl("Central Market", "Riverside Park")}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10" />
            <MapMarker className="left-[24%] top-[34%]" label={t("Pickup")} tone="emerald" />
            <MapMarker className="left-[68%] top-[62%]" label={t("Drop-off")} tone="rose" />
            <div className={`absolute ${selected.position} grid size-14 place-items-center rounded-full bg-slate-950 text-white shadow-lg transition-all duration-500`}>
              <Navigation size={24} fill="currentColor" />
            </div>
            <div className="absolute left-[18%] top-[78%] hidden rounded-lg border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur md:block">
              <p className="text-sm font-bold text-slate-500">{t("Selected ride")}</p>
              <p className="mt-1 text-xl font-bold">{t(selected.name)}</p>
              <p className="mt-1 text-sm text-slate-600">{t(selected.detail)} - {selected.fare}</p>
            </div>
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur md:left-auto md:w-96">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{t(selected.name)} {t("driver nearby")}</p>
                  <p className="mt-1 text-sm text-slate-500">{selected.driver} - {selected.car} - 4.9 {t("Rating")}</p>
                </div>
                <span className="rounded-md bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">{selected.eta}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CreditCard size={17} />
                {t("Visa ending 2048")}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-base font-bold" : "text-slate-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function MapMarker({ className, label, tone }: { className: string; label: string; tone: "emerald" | "rose" }) {
  const color = tone === "emerald" ? "bg-emerald-600" : "bg-rose-500";

  return (
    <div className={`absolute ${className}`}>
      <div className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-bold shadow-md">
        <span className={`size-3 rounded-full ${color}`} />
        {label}
      </div>
    </div>
  );
}
