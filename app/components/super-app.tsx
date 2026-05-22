"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BatteryCharging,
  Bell,
  Car,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Gauge,
  Languages,
  LocateFixed,
  LogOut,
  MapPin,
  MessageCircle,
  Navigation,
  Package,
  Power,
  Route,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppButton } from "@/app/components/ui/button";
import { TextInput } from "@/app/components/ui/text-input";
import { languageSwitchLabel, translate } from "@/app/data/app-i18n";
import { localeFontFamilies } from "@/app/data/homepage-data";
import type { Locale } from "@/app/data/homepage-data";
import { cars, chargingStations, driverNav, driverRequests, passengerNav, rideOptions } from "@/app/data/mock-data";
import type { DriverPage, PassengerPage, Role } from "@/app/data/mock-data";

type Translator = (phrase: string) => string;

export function PassengerRoute({ page }: { page: PassengerPage }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedRide, setSelectedRide] = useState("Standard");
  const selected = rideOptions.find((ride) => ride.name === selectedRide) ?? rideOptions[1];
  const t = (phrase: string) => translate(locale, phrase);

  return (
    <AppShell
      locale={locale}
      onLocaleChange={() => setLocale(locale === "en" ? "km" : "en")}
      role="passenger"
      active={page}
      eyebrow={t("User app")}
      title={t(passengerTitle(page))}
      subtitle={t(passengerSubtitle(page))}
      searchText={t("Where are you going?")}
      metrics={[
        [t("Pickup"), selected.eta],
        [t("Fare"), selected.fare],
        [t("Rating"), "4.96"],
        [t("Wallet"), "$84"],
        [t("Charging AI"), "8"],
        [t("Bookings"), "24"],
      ]}
      topAction={<LinkButton href="/passenger/profile" label={t("Profile")} />}
    >
      {page === "home" && <PassengerHome selectedRide={selectedRide} onSelectRide={setSelectedRide} selectedFare={selected.fare} t={t} />}
      {page === "rides" && <PassengerRides selectedRide={selectedRide} onSelectRide={setSelectedRide} t={t} />}
      {page === "delivery" && <PassengerDelivery t={t} />}
      {page === "marketplace" && <PassengerMarketplace t={t} />}
      {page === "charging" && <PassengerCharging t={t} />}
      {page === "chat" && <ChatPage role="passenger" t={t} />}
      {page === "profile" && <ProfilePage role="passenger" t={t} />}
    </AppShell>
  );
}

export function DriverRoute({ page }: { page: DriverPage }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [online, setOnline] = useState(true);
  const activeRequest = driverRequests[online ? 0 : 1];
  const t = (phrase: string) => translate(locale, phrase);

  return (
    <AppShell
      locale={locale}
      onLocaleChange={() => setLocale(locale === "en" ? "km" : "en")}
      role="driver"
      active={page}
      eyebrow={t("Driver app")}
      title={t(driverTitle(page))}
      subtitle={t(driverSubtitle(page))}
      metrics={[
        [t("Today"), "$186.40"],
        [t("Acceptance"), "92%"],
        [t("Payout"), "$428"],
        [t("Online"), online ? t("Active") : t("Paused")],
        [t("Requests"), "12"],
        [t("Zone"), "BKK1"],
      ]}
      topAction={
        <AppButton
          type="button"
          onClick={() => setOnline((value) => !value)}
          variant="unstyled"
          className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold ${
            online ? "bg-emerald-500 text-slate-950" : "bg-white/10 text-white"
          }`}
        >
          <Power size={17} />
          {online ? t("Online") : t("Go online")}
        </AppButton>
      }
    >
      {page === "home" && <DriverHome online={online} activeRequest={activeRequest} t={t} />}
      {page === "rides" && <DriverRides activeRequest={activeRequest} t={t} />}
      {page === "delivery" && <DriverDelivery t={t} />}
      {page === "earnings" && <DriverEarnings t={t} />}
      {page === "chat" && <ChatPage role="driver" t={t} />}
      {page === "profile" && <ProfilePage role="driver" t={t} />}
    </AppShell>
  );
}

function AppShell({
  locale,
  onLocaleChange,
  role,
  active,
  eyebrow,
  title,
  subtitle,
  searchText,
  metrics,
  topAction,
  children,
}: {
  locale: Locale;
  onLocaleChange: () => void;
  role: Role;
  active: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  searchText?: string;
  metrics: [string, string][];
  topAction: React.ReactNode;
  children: React.ReactNode;
}) {
  const nav = role === "passenger" ? passengerNav : driverNav;
  const t = (phrase: string) => translate(locale, phrase);

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-24 text-slate-950 lg:pb-8" lang={locale} style={{ fontFamily: localeFontFamilies[locale] }}>
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-bold">
              <ArrowLeft size={18} />
              {t("Home")}
            </Link>
            <div className="flex items-center gap-2">
              {topAction}
              <AppButton
                type="button"
                onClick={onLocaleChange}
                variant="unstyled"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-white/10 px-3 text-sm font-bold"
                aria-label={`Switch to ${locale === "en" ? "Khmer" : "English"}`}
              >
                <Languages size={17} />
                {languageSwitchLabel[locale]}
              </AppButton>
              <AppButton type="button" variant="unstyled" className="grid size-10 place-items-center rounded-md bg-white/10" aria-label={t("Notifications")}>
                <Bell size={19} />
              </AppButton>
              <Link
                href={`/login?role=${role}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-bold transition hover:bg-white hover:text-slate-950"
              >
                <LogOut size={17} />
                <span className="hidden sm:inline">{t("Logout")}</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-emerald-300">{eyebrow}</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-slate-300">{subtitle}</p>
            </div>
            {searchText ? (
              <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 text-slate-950">
                <Search size={18} className="text-slate-400" />
                <span className="text-sm font-bold">{searchText}</span>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map(([label, value]) => (
            <Metric key={label} label={label} value={value} />
          ))}
        </div>
        <div className="mt-6">{children}</div>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-2 py-2 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] lg:hidden">
        <div className={role === "passenger" ? "grid grid-cols-7" : "grid grid-cols-6"}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`grid justify-items-center gap-1 rounded-md px-1 py-2 text-[11px] font-bold ${active === item.key ? "text-emerald-700" : "text-slate-400"}`}>
              <item.icon size={18} />
              {t(item.label)}
            </Link>
          ))}
        </div>
      </nav>

      <nav className="mx-auto hidden max-w-7xl px-4 sm:px-6 lg:mt-2 lg:block lg:px-8">
        <div className={`${role === "passenger" ? "grid-cols-7" : "grid-cols-6"} grid gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm`}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-bold ${active === item.key ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
              <item.icon size={18} />
              {t(item.label)}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}

function PassengerHome({
  selectedRide,
  onSelectRide,
  selectedFare,
  t,
}: {
  selectedRide: string;
  onSelectRide: (ride: string) => void;
  selectedFare: string;
  t: Translator;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-6">
        <MapCard labelA={t("You")} labelB={t("Riverside")} title={t("Fast booking nearby")} detail={t("Central Market to Riverside Park")} actionHref="/passenger/rides" actionLabel={t("Open booking")} />
        <div className="grid gap-3 sm:grid-cols-4">
          <ServiceCard href="/passenger/rides" icon={Car} label={t("Booking")} detail={t("4 min")} active />
          <ServiceCard href="/passenger/delivery" icon={Package} label={t("Delivery")} detail="$5.20" />
          <ServiceCard href="/passenger/marketplace" icon={ShoppingBag} label={t("Buy/Rent")} detail={t("54 cars")} />
          <ServiceCard href="/passenger/charging" icon={BatteryCharging} label={t("Charge AI")} detail={t("8 nearby")} />
        </div>
      </div>
      <aside className="grid gap-6">
        <RideChooser selectedRide={selectedRide} onSelectRide={onSelectRide} t={t} />
        <div className="grid grid-cols-2 gap-3">
          <InfoTile icon={WalletCards} title={t("Wallet")} detail={t("Visa 2048")} />
          <InfoTile icon={Sparkles} title={t("AI helper")} detail={t("Route and charge tips")} />
        </div>
        <Panel title={t("Recent places")} icon={MapPin}>
          {["Central Market", "Riverside Park", "Aeon Mall"].map((place) => (
            <ListRow key={place} title={t(place)} detail={place === "Central Market" ? selectedFare : t("Saved place")} />
          ))}
        </Panel>
      </aside>
    </div>
  );
}

type RideTimeMode = "now" | "later";
type BookingStage = "planning" | "priced" | "matching";

type NearbyDriver = {
  name: string;
  vehicle: string;
  rating: string;
  arrival: string;
  distance: string;
};

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

function calculateRidePrice({ rideType, pickup, destination, timeMode }: { rideType: string; pickup: string; destination: string; timeMode: RideTimeMode }) {
  const rideMultiplier = rideType === "Premium" ? 1.75 : rideType === "Standard" ? 1.25 : 1;
  const routeSeed = Math.max(1, pickup.length + destination.length);
  const distance = Number((3.2 + (routeSeed % 19) / 10).toFixed(1));
  const etaMinutes = Math.round(distance * 4 + (timeMode === "later" ? 2 : 0));
  const demand = timeMode === "later" ? 0.92 : 1.08;
  const price = Number(((3.2 + distance * 1.38 + etaMinutes * 0.22) * rideMultiplier * demand).toFixed(2));

  return {
    distance: `${distance} mi`,
    eta: `${etaMinutes} min`,
    price: `$${price.toFixed(2)}`,
  };
}

function findNearbyDrivers(rideType: string): NearbyDriver[] {
  const vehicles = {
    Economy: ["Blue Prius", "White Corolla", "Silver Yaris"],
    Standard: ["Silver Camry", "Black Accord", "Green Ioniq"],
    Premium: ["Black Model 3", "Pearl Lexus ES", "Navy Mercedes C"],
  } as Record<string, string[]>;

  return ["Dara", "Amelia", "Ethan"].map((name, index) => ({
    name,
    vehicle: vehicles[rideType]?.[index] ?? vehicles.Standard[index],
    rating: (4.97 - index * 0.03).toFixed(2),
    arrival: `${4 + index * 2} min`,
    distance: `${(0.6 + index * 0.4).toFixed(1)} mi`,
  }));
}

function PassengerRides({ selectedRide, onSelectRide, t }: { selectedRide: string; onSelectRide: (ride: string) => void; t: Translator }) {
  const [pickup, setPickup] = useState("Central Market");
  const [destination, setDestination] = useState("Riverside Park");
  const [timeMode, setTimeMode] = useState<RideTimeMode>("now");
  const [scheduledTime, setScheduledTime] = useState("18:30");
  const [stage, setStage] = useState<BookingStage>("planning");
  const [paymentMethod, setPaymentMethod] = useState("Wallet");

  const estimate = calculateRidePrice({ rideType: selectedRide, pickup, destination, timeMode });
  const nearbyDrivers = findNearbyDrivers(selectedRide);

  const confirmBooking = () => {
    setStage("matching");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <aside className="grid gap-6">
        <Panel title={t("RideForm.tsx")} icon={Car}>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-2">
              {rideOptions.map((ride) => (
                <AppButton
                  type="button"
                  key={ride.name}
                  onClick={() => {
                    onSelectRide(ride.name);
                    setStage("planning");
                  }}
                  variant="unstyled"
                  className={`rounded-md border px-3 py-3 text-sm font-bold ${
                    selectedRide === ride.name ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  {t(ride.name)}
                </AppButton>
              ))}
            </div>

            <TextInput
              icon={<LocateFixed size={18} className="text-emerald-600" />}
              label={t("Pickup location")}
              value={pickup}
              onChange={(event) => {
                setPickup(event.target.value);
                setStage("planning");
              }}
            />
            <TextInput
              icon={<MapPin size={18} className="text-rose-500" />}
              label={t("Destination")}
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
                setStage("planning");
              }}
            />

            <div className="grid gap-2">
              <p className="text-sm font-bold text-slate-700">{t("Select ride time")}</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["now", t("Ride now")],
                  ["later", t("Schedule later")],
                ].map(([value, label]) => (
                  <AppButton
                    type="button"
                    key={value}
                    onClick={() => {
                      setTimeMode(value as RideTimeMode);
                      setStage("planning");
                    }}
                    variant="unstyled"
                    className={`rounded-md border px-3 py-3 text-sm font-bold ${
                      timeMode === value ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {label}
                  </AppButton>
                ))}
              </div>
              {timeMode === "later" ? (
                <TextInput
                  icon={<Clock3 size={18} className="text-slate-400" />}
                  label={t("Scheduled time")}
                  type="time"
                  value={scheduledTime}
                  onChange={(event) => setScheduledTime(event.target.value)}
                />
              ) : null}
            </div>

            <AppButton type="button" onClick={() => setStage("priced")} className="w-full" icon={<Sparkles size={18} />}>
              {t("AI Route & Price Calculation")}
            </AppButton>
          </div>
        </Panel>

        <Panel title={t("AI estimate")} icon={Route}>
          <div className="grid grid-cols-2 gap-2">
            <Metric label={t("Distance")} value={estimate.distance} />
            <Metric label={t("ETA")} value={estimate.eta} />
            <Metric label={t("Estimated price")} value={estimate.price} />
            <Metric label={t("Available drivers")} value={nearbyDrivers.length.toString()} />
          </div>
          <AppButton type="button" onClick={confirmBooking} disabled={stage === "planning"} className="mt-2 w-full" icon={<ChevronRight size={18} />}>
            {t("Passenger Confirm Booking")}
          </AppButton>
        </Panel>

        <Panel title={t("Automatic Payment")} icon={CreditCard}>
          <div className="grid grid-cols-3 gap-2">
            {["Wallet", "Card", "Cash"].map((method) => (
              <AppButton
                type="button"
                key={method}
                onClick={() => setPaymentMethod(method)}
                variant="unstyled"
                className={`rounded-md border px-3 py-3 text-sm font-bold ${
                  paymentMethod === method ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {t(method)}
              </AppButton>
            ))}
          </div>
        </Panel>
      </aside>

      <section className="grid gap-6">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="relative min-h-[470px] bg-slate-200">
            <iframe
              title={t("Passenger ride booking live route map")}
              src={googleDirectionsEmbedUrl(pickup, destination)}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-sky-400/15" />
            <MapMarker className="left-[24%] top-[34%]" label={t("Pickup")} tone="emerald" />
            <MapMarker className="left-[68%] top-[62%]" label={t("Destination")} tone="rose" />
            <div className="absolute left-[48%] top-[46%] grid size-14 place-items-center rounded-full bg-slate-950 text-white shadow-lg">
              <Navigation size={24} fill="currentColor" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur md:left-auto md:w-[420px]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold">{t(selectedRide)} {t("ride request")}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {pickup} to {destination} / {timeMode === "now" ? t("Ride now") : `${t("Scheduled")} ${scheduledTime}`}
                  </p>
                </div>
                <span className="rounded-md bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">{estimate.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PassengerDelivery({ t }: { t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <MapCard labelA={t("Pickup")} labelB={t("Recipient")} title={t("Delivery route")} detail={t("BKK1 Cafe to Toul Kork")} actionHref="/passenger/delivery" actionLabel={t("Schedule delivery")} />
      <div className="grid gap-6">
        <Panel title={t("Package details")} icon={Package}>
          <ListRow title={t("Small parcel")} detail={t("Documents, food, or items under 5 kg")} />
          <ListRow title={t("Recipient")} detail={t("Srey / +855 12 345 678")} />
          <ListRow title={t("Estimate")} detail="$5.20 / 28 min" />
        </Panel>
        <div className="grid grid-cols-2 gap-3">
          <InfoTile icon={ShieldCheck} title={t("Protected")} detail={t("Photo proof")} />
          <InfoTile icon={MessageCircle} title={t("Courier chat")} detail={t("Quick replies")} />
        </div>
      </div>
    </div>
  );
}

function PassengerMarketplace({ t }: { t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <Panel title={t("Buy / Rent filters")} icon={ShoppingBag}>
        <ListRow title={t("Budget")} detail={t("$40 to $80 per day")} />
        <ListRow title={t("Powertrain")} detail={t("EV and hybrid")} />
        <ListRow title={t("Location")} detail={t("Within 5 miles")} />
      </Panel>
      <div className="grid gap-4 md:grid-cols-3">
        {cars.map((car) => (
          <article key={car.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid h-32 place-items-center rounded-md bg-slate-100 text-slate-700">
              <Car size={46} />
            </div>
            <p className="mt-4 text-lg font-bold">{car.name}</p>
            <p className="mt-1 text-sm text-slate-500">{t(car.meta)}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">{car.price}</span>
              <span className="rounded-md bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">{t(car.tag)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PassengerCharging({ t }: { t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <MapCard labelA={t("You")} labelB={t("Best charger")} title={t("Charging station AI")} detail={t("AI-ranked stations by distance, speed, price, and availability")} actionHref="/passenger/charging" actionLabel={t("Reserve charger")} />
      <div className="grid gap-6">
        <Panel title={t("AI recommendations")} icon={Sparkles}>
          {chargingStations.map((station) => (
            <ListRow key={station.name} title={station.name} detail={`${station.detail} / ${station.tip}`} />
          ))}
        </Panel>
        <div className="grid grid-cols-2 gap-3">
          <InfoTile icon={BatteryCharging} title={t("Fast charge")} detail={t("150 kW nearby")} />
          <InfoTile icon={WalletCards} title={t("Best price")} detail="$0.28 kWh" />
          <InfoTile icon={MapPin} title={t("Closest")} detail="0.8 mi" />
          <InfoTile icon={ShieldCheck} title={t("Available")} detail={t("Live status")} />
        </div>
      </div>
    </div>
  );
}

function DriverHome({ online, activeRequest, t }: { online: boolean; activeRequest: (typeof driverRequests)[number]; t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Trips", "18"],
            ["Hours", "7.5"],
            ["Rating", "4.96"],
          ].map(([label, value]) => (
            <Metric key={label} label={t(label)} value={value} />
          ))}
        </div>
        <DriverRequestCard activeRequest={activeRequest} online={online} t={t} />
      </div>
      <aside className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <InfoTile icon={Route} title={t("Active route")} detail={t("18 min remaining")} />
          <InfoTile icon={WalletCards} title={t("Payout")} detail={t("$428 available")} />
          <InfoTile icon={ShieldCheck} title={t("Safety")} detail={t("Verified ride")} />
          <InfoTile icon={Gauge} title={t("Performance")} detail={t("92% accepted")} />
        </div>
        <Panel title={t("Task queue")} icon={Truck}>
          {["Airport pickup", "Package return", "Charging stop"].map((task) => (
            <ListRow key={task} title={t(task)} detail={t("Ready when current trip ends")} />
          ))}
        </Panel>
      </aside>
    </div>
  );
}

function DriverRides({ activeRequest, t }: { activeRequest: (typeof driverRequests)[number]; t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <DriverRequestCard activeRequest={activeRequest} online t={t} />
      <Panel title={t("Ride requests")} icon={Car}>
        <ListRow title={t("Central Market pickup")} detail="$14.20 / 3.8 mi / 6 min" />
        <ListRow title={t("Aeon Mall pickup")} detail="$10.60 / 2.1 mi / 4 min" />
        <ListRow title={t("Airport queue")} detail="$21.40 / 8.2 mi / 19 min" />
      </Panel>
    </div>
  );
}

function DriverDelivery({ t }: { t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <MapCard labelA={t("Pickup")} labelB={t("Recipient")} title={t("Delivery assignment")} detail={t("BKK1 Cafe to Toul Kork")} actionHref="/driver/delivery" actionLabel={t("Start delivery")} />
      <Panel title={t("Delivery workflow")} icon={Truck}>
        <ListRow title={t("Pickup package")} detail={t("Confirm item and take photo proof")} />
        <ListRow title={t("Navigate to recipient")} detail="11 min / 2.4 mi" />
        <ListRow title={t("Complete drop-off")} detail="$7.80 payout" />
      </Panel>
    </div>
  );
}

function DriverEarnings({ t }: { t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <Panel title={t("Payout summary")} icon={CircleDollarSign}>
        <ListRow title={t("Available now")} detail="$428.00" />
        <ListRow title={t("Today")} detail="$186.40 from 18 trips" />
        <ListRow title={t("Weekly bonus")} detail="$42.00 unlocked" />
      </Panel>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{t("Weekly earnings")}</h2>
          <ChartNoAxesColumnIncreasing size={19} className="text-slate-400" />
        </div>
        <div className="mt-6 grid h-64 grid-cols-7 items-end gap-3">
          {[42, 58, 74, 61, 86, 70, 95].map((height, index) => (
            <div key={index} className="grid gap-2">
              <div className="rounded-t-md bg-emerald-600" style={{ height: `${height * 2}px` }} />
              <p className="text-center text-xs font-bold text-slate-500">{["M", "T", "W", "T", "F", "S", "S"][index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatPage({ role, t }: { role: Role; t: Translator }) {
  const names = role === "passenger" ? ["Dara Driver", "Support", "Courier Vannak"] : ["Sophea User", "Recipient Srey", "Driver Support"];

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Panel title={t("Conversations")} icon={MessageCircle}>
        {names.map((name, index) => (
          <ListRow key={name} title={t(name)} detail={index === 0 ? t("Arriving in 4 minutes") : t("Tap to continue chat")} />
        ))}
      </Panel>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold">{t(names[0])}</h2>
        <div className="mt-5 grid gap-3">
          <Bubble align="left" text={t("Hi, I am on the way now.")} />
          <Bubble align="right" text={t("Great, I will meet you at the main entrance.")} />
          <Bubble align="left" text={t("Perfect. I will arrive in about 4 minutes.")} />
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500">
          <MessageCircle size={18} />
          {t("Type a message")}
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ role, t }: { role: Role; t: Translator }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-md bg-slate-950 text-white">
            <UserRound size={30} />
          </span>
          <div>
            <h2 className="text-2xl font-bold">{role === "passenger" ? "Sophea" : "Dara"}</h2>
            <p className="mt-1 text-sm text-slate-500">{role === "passenger" ? t("User account") : t("Verified driver")}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Metric label={t("Rating")} value="4.96" />
          <Metric label={role === "passenger" ? t("Bookings") : t("Jobs")} value={role === "passenger" ? "24" : "382"} />
          <Metric label={t("Safety")} value={t("On")} />
        </div>
      </div>
      <Panel title={t("Account settings")} icon={UserRound}>
        <ListRow title={t("Personal information")} detail={t("Name, phone, email")} />
        <ListRow title={role === "passenger" ? t("Payment methods") : t("Vehicle documents")} detail={role === "passenger" ? "Visa 2048, wallet" : t("License, insurance, inspection")} />
        <ListRow title={t("Safety center")} detail={t("Trusted contacts and emergency tools")} />
        <ListRow title={t("Preferences")} detail={t("Language, notifications, privacy")} />
      </Panel>
    </div>
  );
}

function DriverRequestCard({ activeRequest, online, t }: { activeRequest: (typeof driverRequests)[number]; online: boolean; t: Translator }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <MapCardInner labelA={t("Pickup")} labelB={t("Drop-off")} />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{online ? t("New request") : t("Next queued task")}</p>
          <span className="rounded-md bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">{activeRequest.fare}</span>
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr] gap-3">
          <span className="grid size-11 place-items-center rounded-md bg-slate-950 text-white">
            <activeRequest.icon size={20} />
          </span>
          <div>
            <p className="font-bold">{activeRequest.from}</p>
            <p className="mt-1 text-sm text-slate-500">{activeRequest.to}</p>
            <p className="mt-2 text-sm text-slate-500">{activeRequest.distance} / {activeRequest.eta}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <AppButton type="button" variant="secondary">
            {t("Decline")}
          </AppButton>
          <AppButton type="button">
            {t("Accept")}
          </AppButton>
        </div>
      </div>
    </div>
  );
}

function RideChooser({ selectedRide, onSelectRide, t }: { selectedRide: string; onSelectRide: (ride: string) => void; t: Translator }) {
  return (
    <Panel title={t("Choose ride")} icon={Car}>
      {rideOptions.map((ride) => (
        <AppButton
          type="button"
          key={ride.name}
          onClick={() => onSelectRide(ride.name)}
          variant="unstyled"
          className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border p-3 text-left ${
            selectedRide === ride.name ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50"
          }`}
        >
          <span className={`grid size-10 place-items-center rounded-md ${selectedRide === ride.name ? "bg-white text-slate-950" : "bg-white text-slate-700"}`}>
            <Car size={19} />
          </span>
          <span>
            <span className="block text-sm font-bold">{t(ride.name)}</span>
            <span className={`mt-1 block text-xs ${selectedRide === ride.name ? "text-slate-300" : "text-slate-500"}`}>
              {ride.eta} / {ride.seats}
            </span>
          </span>
          <span className="text-sm font-bold">{ride.fare}</span>
        </AppButton>
      ))}
    </Panel>
  );
}

function MapCard({ labelA, labelB, title, detail, actionHref, actionLabel }: { labelA: string; labelB: string; title: string; detail: string; actionHref: string; actionLabel: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <MapCardInner labelA={labelA} labelB={labelB} />
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-lg font-bold">{title}</p>
          <p className="mt-1 text-sm text-slate-500">{detail}</p>
        </div>
        <AppButton href={actionHref} icon={<ChevronRight size={18} />}>
          {actionLabel}
        </AppButton>
      </div>
    </div>
  );
}

function MapCardInner({ labelA, labelB }: { labelA: string; labelB: string }) {
  return (
    <div className="relative min-h-[420px] bg-slate-200">
      <iframe
        title={`${labelA} to ${labelB} Google map`}
        src={googleDirectionsEmbedUrl(labelA, labelB)}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-sky-400/15" />
      <div className="absolute left-8 top-9 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm sm:text-sm">
        <span className="size-2 rounded-full bg-emerald-500" />
        {labelA}
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm sm:text-sm">
        <span className="size-2 rounded-full bg-rose-500" />
        {labelB}
      </div>
      <div className="absolute left-[48%] top-[46%] grid size-14 place-items-center rounded-full bg-slate-950 text-white shadow-lg">
        <Navigation size={24} fill="currentColor" />
      </div>
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

function ServiceCard({ href, icon: Icon, label, detail, active = false }: { href: string; icon: LucideIcon; label: string; detail: string; active?: boolean }) {
  return (
    <Link href={href} className={`rounded-lg border p-4 text-left shadow-sm ${active ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`}>
      <span className={`grid size-10 place-items-center rounded-md ${active ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
        <Icon size={19} />
      </span>
      <span className="mt-4 block text-sm font-bold">{label}</span>
      <span className="mt-1 block text-xs text-slate-500">{detail}</span>
    </Link>
  );
}

function InfoTile({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="grid size-10 place-items-center rounded-md bg-slate-100 text-slate-700">
        <Icon size={19} />
      </span>
      <p className="mt-3 text-sm font-bold">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <Icon size={18} className="text-slate-400" />
      </div>
      <div className="mt-3 grid gap-2">{children}</div>
    </div>
  );
}

function ListRow({ title, detail }: { title: string; detail: string }) {
  return (
    <AppButton type="button" variant="unstyled" className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-3 text-left">
      <span>
        <span className="block text-sm font-bold">{title}</span>
        <span className="mt-1 block text-xs text-slate-500">{detail}</span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-slate-400" />
    </AppButton>
  );
}

function Bubble({ align, text }: { align: "left" | "right"; text: string }) {
  return (
    <p className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${align === "right" ? "ml-auto bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}>
      {text}
    </p>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="hidden rounded-md bg-white/10 px-3 py-2 text-sm font-bold sm:inline-flex">
      {label}
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function passengerTitle(page: PassengerPage) {
  const titles = {
    home: "Good morning, Sophea",
    rides: "Choose your booking",
    delivery: "Send a package",
    marketplace: "Buy or rent vehicles",
    charging: "Charging station AI",
    chat: "User chat",
    profile: "Your user profile",
  };
  return titles[page];
}

function passengerSubtitle(page: PassengerPage) {
  const subtitles = {
    home: "Book rides, send packages, buy or rent vehicles, find charging stations with AI, and manage your wallet.",
    rides: "Compare rides, schedule trips, review fares, and book the best option for your route.",
    delivery: "Create deliveries with pickup, recipient details, proof of delivery, and live courier chat.",
    marketplace: "Explore cars to rent or buy with price, range, type, and location details.",
    charging: "Let AI recommend the best charging station by distance, speed, live availability, and price.",
    chat: "Message your driver, courier, marketplace seller, or support without leaving the app.",
    profile: "Manage identity, payments, saved places, safety settings, and app preferences.",
  };
  return subtitles[page];
}

function driverTitle(page: DriverPage) {
  const titles = {
    home: "Welcome back, Dara",
    rides: "Ride requests",
    delivery: "Delivery jobs",
    earnings: "Earnings dashboard",
    chat: "Driver chat",
    profile: "Driver profile",
  };
  return titles[page];
}

function driverSubtitle(page: DriverPage) {
  const subtitles = {
    home: "Go online, accept rides and deliveries, track earnings, and manage your route from one dashboard.",
    rides: "Review ride requests, pickup distance, fare, ETA, and route before accepting.",
    delivery: "Handle package pickup, navigation, proof of delivery, and delivery history.",
    earnings: "Track daily income, weekly progress, bonuses, payout availability, and performance stats.",
    chat: "Talk with users, recipients, dispatch, and support with quick operational replies.",
    profile: "Manage driver documents, vehicle status, payout details, safety tools, and settings.",
  };
  return subtitles[page];
}
