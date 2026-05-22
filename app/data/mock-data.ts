import {
  BatteryCharging,
  Car,
  CircleDollarSign,
  Home,
  MessageCircle,
  Navigation,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ToggleRight,
  Truck,
  UserRound,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Role = "passenger" | "driver";
export type PassengerPage = "home" | "rides" | "delivery" | "marketplace" | "charging" | "chat" | "profile";
export type DriverPage = "home" | "rides" | "delivery" | "earnings" | "chat" | "profile";

export type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type RoleContent = {
  label: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  homeHref: string;
  image: string;
};

export const passengerFeatures: Feature[] = [
  { icon: Car, title: "Booking", text: "Compare Economy, Standard, and Premium rides with live fare and pickup estimates." },
  { icon: Package, title: "Package delivery", text: "Schedule courier jobs with recipient details, proof of delivery, and tracking." },
  { icon: ShoppingBag, title: "Buy / Rent vehicles", text: "Browse electric and hybrid vehicles to buy or rent with clean filters." },
  { icon: BatteryCharging, title: "Charging station AI", text: "Find nearby charging stations with AI suggestions for speed, price, and availability." },
  { icon: CircleDollarSign, title: "Wallet and payment", text: "Manage cards, balances, transactions, and trip spending in one place." },
  { icon: UserRound, title: "Safety center", text: "Use trip sharing, trusted contacts, emergency actions, and verification." },
];

export const driverFeatures: Feature[] = [
  { icon: ToggleRight, title: "Online controls", text: "Go online, pause work, and review ride or delivery requests quickly." },
  { icon: CircleDollarSign, title: "Earnings dashboard", text: "Track today, weekly bonuses, payout status, and driver performance." },
  { icon: Navigation, title: "Ride management", text: "Accept trips, navigate to pickup, follow route progress, and complete jobs." },
  { icon: Truck, title: "Delivery workflow", text: "Manage pickup proof, recipient navigation, and delivery history." },
  { icon: MessageCircle, title: "Driver chat", text: "Message users, recipients, dispatch, and support from every job." },
  { icon: UserRound, title: "Driver profile", text: "Manage vehicle documents, payout details, safety tools, and preferences." },
];

export const routeLinks = [
  { role: "passenger", href: "/passenger", label: "User home", icon: Car },
  { role: "passenger", href: "/passenger/rides", label: "Booking", icon: Navigation },
  { role: "passenger", href: "/passenger/delivery", label: "Delivery", icon: Package },
  { role: "passenger", href: "/passenger/marketplace", label: "Buy / Rent", icon: ShoppingBag },
  { role: "passenger", href: "/passenger/charging", label: "Charging AI", icon: BatteryCharging },
  { role: "driver", href: "/driver", label: "Driver hub", icon: ToggleRight },
  { role: "driver", href: "/driver/rides", label: "Driver rides", icon: Car },
  { role: "driver", href: "/driver/delivery", label: "Driver delivery", icon: Truck },
  { role: "driver", href: "/driver/earnings", label: "Earnings", icon: CircleDollarSign },
] satisfies { role: Role; href: string; label: string; icon: LucideIcon }[];

export const statsByRole = {
  passenger: [
    { label: "Pickup estimate", value: "4 min" },
    { label: "Standard fare", value: "$12" },
    { label: "User tools", value: "7" },
    { label: "Trip rating", value: "4.96" },
  ],
  driver: [
    { label: "Today earnings", value: "$186" },
    { label: "Queued jobs", value: "3" },
    { label: "Driver routes", value: "6" },
    { label: "Driver rating", value: "4.96" },
  ],
} satisfies Record<Role, { label: string; value: string }[]>;

export const loginRoleContent = {
  passenger: {
    label: "User",
    icon: Car,
    eyebrow: "User login",
    title: "Book rides, send deliveries, buy or rent vehicles, and find charging stations.",
    description: "Use your user account to manage booking, delivery tracking, buy/rent vehicles, charging station AI, payments, and safety tools.",
    submitLabel: "Login as User",
    homeHref: "/passenger",
    registerHref: "/register?role=passenger",
    image:
      "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80')",
  },
  driver: {
    label: "Driver",
    icon: ToggleRight,
    eyebrow: "Driver login",
    title: "Go online, accept jobs, and track earnings from your driver hub.",
    description: "Use your driver account to manage ride requests, delivery jobs, payouts, vehicle profile, and support chat.",
    submitLabel: "Login as Driver",
    homeHref: "/driver",
    registerHref: "/register?role=driver",
    image:
      "url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80')",
  },
} satisfies Record<Role, RoleContent & { registerHref: string }>;

export const registerRoleContent = {
  passenger: {
    label: "User",
    icon: Car,
    eyebrow: "User signup",
    title: "Create a user account for booking, delivery, buy/rent, and charging station AI.",
    description: "Save your phone, email, payment method, favorite destinations, vehicle interests, and charging preferences.",
    submitLabel: "Create User account",
    homeHref: "/passenger",
    loginHref: "/login?role=passenger",
    image:
      "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80')",
  },
  driver: {
    label: "Driver",
    icon: ToggleRight,
    eyebrow: "Driver signup",
    title: "Create a driver account for jobs, earnings, payouts, and vehicle tools.",
    description: "Set up your driver profile with contact details, vehicle documents, payout settings, and work preferences.",
    submitLabel: "Create Driver account",
    homeHref: "/driver",
    loginHref: "/login?role=driver",
    image:
      "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80')",
  },
} satisfies Record<Role, RoleContent & { loginHref: string }>;

export const passengerNav = [
  { href: "/passenger", label: "Home", icon: Home, key: "home" },
  { href: "/passenger/rides", label: "Booking", icon: Car, key: "rides" },
  { href: "/passenger/delivery", label: "Delivery", icon: Package, key: "delivery" },
  { href: "/passenger/marketplace", label: "Buy/Rent", icon: ShoppingBag, key: "marketplace" },
  { href: "/passenger/charging", label: "Charge AI", icon: BatteryCharging, key: "charging" },
  { href: "/passenger/chat", label: "Chat", icon: MessageCircle, key: "chat" },
  { href: "/passenger/profile", label: "Profile", icon: UserRound, key: "profile" },
] as const;

export const driverNav = [
  { href: "/driver", label: "Home", icon: Home, key: "home" },
  { href: "/driver/rides", label: "Rides", icon: Car, key: "rides" },
  { href: "/driver/delivery", label: "Delivery", icon: Truck, key: "delivery" },
  { href: "/driver/earnings", label: "Earnings", icon: CircleDollarSign, key: "earnings" },
  { href: "/driver/chat", label: "Chat", icon: MessageCircle, key: "chat" },
  { href: "/driver/profile", label: "Profile", icon: UserRound, key: "profile" },
] as const;

export const rideOptions = [
  { name: "Economy", eta: "4 min", fare: "$8.40", seats: "4 seats" },
  { name: "Standard", eta: "6 min", fare: "$12.20", seats: "4 seats" },
  { name: "Premium", eta: "8 min", fare: "$18.50", seats: "4 seats" },
];

export const driverRequests = [
  { type: "Ride", icon: Car, from: "Central Market", to: "Riverside Park", fare: "$14.20", distance: "3.8 mi", eta: "6 min" },
  { type: "Delivery", icon: Package, from: "BKK1 Cafe", to: "Toul Kork", fare: "$7.80", distance: "2.4 mi", eta: "11 min" },
];

export const cars = [
  { name: "Tesla Model 3", price: "$78/day", meta: "2024 / 312 mi range", tag: "Electric" },
  { name: "Toyota Camry", price: "$42/day", meta: "2022 / 4 seats", tag: "Comfort" },
  { name: "Hyundai Ioniq 5", price: "$69/day", meta: "2023 / fast charge", tag: "Premium" },
];

export const chargingStations = [
  { name: "Aeon Mall Supercharge", detail: "0.8 mi / 6 stalls open / $0.28 kWh", tip: "AI pick: fastest and cheapest now" },
  { name: "BKK1 Energy Hub", detail: "1.4 mi / 3 stalls open / $0.31 kWh", tip: "Reserve if arriving after 6 PM" },
  { name: "Riverside Charge Point", detail: "2.1 mi / 2 stalls open / $0.35 kWh", tip: "Best for marketplace test drives" },
];

export const bookingVehicles = [
  { name: "Economy", seats: 4, eta: "4 min", fare: "$8.40", detail: "Affordable city rides", driver: "Noah", car: "Blue Prius", position: "left-[40%] top-[45%]" },
  { name: "Standard", seats: 4, eta: "6 min", fare: "$12.20", detail: "Roomier vehicles", driver: "Amelia", car: "Silver Camry", position: "left-[45%] top-[48%]" },
  { name: "Premium", seats: 4, eta: "8 min", fare: "$18.50", detail: "Top-rated luxury cars", driver: "Ethan", car: "Black Model 3", position: "left-[52%] top-[54%]" },
];

export const homepageServiceGroups = [
  {
    audience: "passenger",
    eyebrow: "For users",
    title: "Everyday services",
    services: [
      { href: "/passenger/rides", icon: Car, title: "Booking", text: "Book city rides now or schedule one for later." },
      { href: "/passenger/delivery", icon: Package, title: "Delivery", text: "Send parcels with recipient details and live tracking." },
      { href: "/passenger/marketplace", icon: ShoppingBag, title: "Buy / Rent", text: "Browse vehicles to buy or rent with clean filters." },
      { href: "/passenger/charging", icon: BatteryCharging, title: "Charging AI", text: "Find the best station by price, speed, distance, and availability." },
      { href: "/passenger/profile", icon: WalletCards, title: "Wallet", text: "Manage cards, balances, and transaction history." },
      { href: "/passenger/chat", icon: ShieldCheck, title: "Safety & Support", text: "Reach support, share status, and use emergency tools." },
    ],
  },
  {
    audience: "driver",
    eyebrow: "For drivers",
    title: "Earn on your schedule",
    services: [
      { href: "/driver", icon: ToggleRight, title: "Go online", text: "Start or pause work and manage incoming requests." },
      { href: "/driver/rides", icon: Navigation, title: "Ride jobs", text: "Accept rides, navigate pickup, and complete trips." },
      { href: "/driver/delivery", icon: Truck, title: "Delivery jobs", text: "Manage pickup proof, recipient navigation, and drop-off." },
      { href: "/driver/earnings", icon: CircleDollarSign, title: "Earnings", text: "Track today, weekly bonuses, payouts, and performance." },
    ],
  },
] satisfies {
  audience: Role;
  eyebrow: string;
  title: string;
  services: { href: string; icon: LucideIcon; title: string; text: string }[];
}[];

export const homepageImpact = [
  { value: "7", label: "User tools in one app" },
  { value: "4 min", label: "Sample pickup estimate" },
  { value: "8", label: "Charging stations nearby" },
  { value: "$186", label: "Sample driver day earnings" },
];

export const homepageNews = [
  {
    icon: Sparkles,
    title: "Charging AI stays built in",
    text: "The app recommends stations by live availability, price, distance, and charging speed.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-first mobility",
    text: "User and driver flows include chat, trusted contacts, verification, and support access.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace beyond rides",
    text: "Users can buy or rent vehicles alongside booking, delivery, payments, and charging.",
  },
];
