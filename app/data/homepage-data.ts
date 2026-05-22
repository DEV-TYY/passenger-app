import {
  BatteryCharging,
  Car,
  Package,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Locale = "en" | "km";
export type QuickActionKey = "booking" | "delivery" | "marketplace" | "charging";

export type HomepageCopy = {
  languageLabel: string;
  nav: Record<string, string>;
  quickActions: Record<QuickActionKey, string>;
  hero: { eyebrow: string; title: string; description: string; login: string; create: string; stats: string[][] };
  services: { eyebrow: string; title: string; description: string; cta: string; groupEyebrow: string; groupTitle: string; cards: string[][] };
  charging: { eyebrow: string; title: string; description: string; impact: string[]; cardEyebrow: string; cardTitle: string; stationRows: string[] };
  highlights: { eyebrow: string; title: string; cta: string; cards: string[][] };
  ready: { eyebrow: string; title: string; login: string; create: string };
  showcase: { pickup: string; arriving: string; routeLabel: string; route: string; verified: string; wallet: string; chargeAi: string; rows: string[][]; cta: string };
  footer: { description: string; columns: { title: string; links: string[] }[] };
};

export const localeFontNames = {
  en: "Inter",
  km: "Noto Sans Khmer",
} satisfies Record<Locale, string>;

export const localeFontFamilies = {
  en: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
  km: "\"Noto Sans Khmer\", \"Khmer OS Battambang\", \"Khmer OS\", Inter, ui-sans-serif, system-ui, sans-serif",
} satisfies Record<Locale, string>;

export const quickActions: { icon: LucideIcon; key: QuickActionKey; href: string; tone: string }[] = [
  { icon: Car, key: "booking", href: "/passenger/rides", tone: "bg-emerald-50 text-brand-deep" },
  { icon: Package, key: "delivery", href: "/passenger/delivery", tone: "bg-sky-50 text-sky-700" },
  { icon: ShoppingBag, key: "marketplace", href: "/passenger/marketplace", tone: "bg-amber-50 text-amber-700" },
  { icon: BatteryCharging, key: "charging", href: "/passenger/charging", tone: "bg-lime-50 text-lime-700" },
];

export const footerHrefs = [
  ["/passenger/rides", "/passenger/delivery", "/passenger/marketplace", "/passenger/charging"],
  ["/passenger", "/passenger/chat", "/passenger/profile"],
  ["/login?role=passenger", "/register?role=passenger"],
];

export const homepageCopy = {
  en: {
    languageLabel: "Khmer",
    nav: { services: "Services", highlights: "Highlights", login: "Login", signup: "Sign up", openMenu: "Open menu" },
    quickActions: {
      booking: "Booking",
      delivery: "Delivery",
      marketplace: "Buy / Rent",
      charging: "Charging AI",
    },
    hero: {
      eyebrow: "User mobility super app",
      title: "Move through the city in one modern app.",
      description: "MovePlus brings rides, parcels, vehicle rentals, payments, and smarter charging into a single polished user experience.",
      login: "Login as User",
      create: "Create account",
      stats: [
        ["4 min", "pickup estimate"],
        ["$12.20", "sample fare"],
        ["8", "chargers nearby"],
      ],
    },
    services: {
      eyebrow: "What we do",
      title: "Everything you need, arranged for speed.",
      description: "The website now works like a front door to the user product: scan the service set and jump into the flow you need.",
      cta: "Open user app",
      groupEyebrow: "For users",
      groupTitle: "Everyday services",
      cards: [
        ["Booking", "Book city rides now or schedule one for later."],
        ["Delivery", "Send parcels with recipient details and live tracking."],
        ["Buy / Rent", "Browse vehicles to buy or rent with clean filters."],
        ["Charging AI", "Find the best station by price, speed, distance, and availability."],
        ["Wallet", "Manage cards, balances, and transaction history."],
        ["Safety & Support", "Reach support, share status, and use emergency tools."],
      ],
    },
    charging: {
      eyebrow: "Charging intelligence",
      title: "Smarter EV stops before the battery becomes the plan.",
      description: "Charging AI compares distance, speed, price, and availability, then turns the best station into a direct route.",
      impact: ["User tools in one app", "Sample pickup estimate", "Charging stations nearby", "Sample driver day earnings"],
      cardEyebrow: "Live station intelligence",
      cardTitle: "The app recommends the best charging stop before you drive.",
      stationRows: ["Fastest: 150 kW", "Best price: $0.28 kWh", "Nearest: 0.8 mi"],
    },
    highlights: {
      eyebrow: "Platform highlights",
      title: "Modern tools beyond rides.",
      cta: "Open Charging AI",
      cards: [
        ["Charging AI stays built in", "The app recommends stations by live availability, price, distance, and charging speed."],
        ["Safety-first mobility", "User and driver flows include chat, trusted contacts, verification, and support access."],
        ["Marketplace beyond rides", "Users can buy or rent vehicles alongside booking, delivery, payments, and charging."],
      ],
    },
    ready: {
      eyebrow: "Ready to explore",
      title: "Start with your user account today.",
      login: "User login",
      create: "Create account",
    },
    showcase: {
      pickup: "Central Market pickup",
      arriving: "Driver arriving in 4 min",
      routeLabel: "Current route",
      route: "Central Market to Riverside",
      verified: "Verified",
      wallet: "Wallet",
      chargeAi: "Charge AI",
      rows: [
        ["Booking", "Central Market to Riverside", "4 min"],
        ["Delivery", "Small parcel to Toul Kork", "$5.20"],
        ["Charging AI", "Aeon Mall Supercharge", "0.8 mi"],
        ["Payment", "Visa ending 2048", "Ready"],
      ],
      cta: "Try Charging AI",
    },
    footer: {
      description: "A modern user super app prototype built around mobility, delivery, marketplace, and Charging AI.",
      columns: [
        { title: "User", links: ["Booking", "Delivery", "Buy / Rent", "Charging AI"] },
        { title: "App", links: ["User home", "Chat", "Profile"] },
        { title: "Account", links: ["Login", "Sign up"] },
      ],
    },
  },
  km: {
    languageLabel: "English",
    nav: { services: "សេវាកម្ម", highlights: "ចំណុចពិសេស", login: "ចូលគណនី", signup: "ចុះឈ្មោះ", openMenu: "បើកម៉ឺនុយ" },
    quickActions: {
      booking: "កក់ជិះ",
      delivery: "ដឹកជញ្ជូន",
      marketplace: "ទិញ / ជួល",
      charging: "Charging AI",
    },
    hero: {
      eyebrow: "ស៊ុបភើអាប់សម្រាប់ការធ្វើដំណើរ",
      title: "ធ្វើដំណើរក្នុងទីក្រុងតាមអាប់ទំនើបតែមួយ។",
      description: "MovePlus រួមបញ្ចូលការកក់ជិះ ការដឹកជញ្ជូន ការជួលយានយន្ត ការទូទាត់ និងការសាកថ្មឆ្លាតវៃក្នុងបទពិសោធន៍តែមួយ។",
      login: "ចូលគណនីអ្នកប្រើ",
      create: "បង្កើតគណនី",
      stats: [
        ["4 នាទី", "ពេលរង់ចាំប៉ាន់ស្មាន"],
        ["$12.20", "តម្លៃគំរូ"],
        ["8", "ស្ថានីយសាកជិតអ្នក"],
      ],
    },
    services: {
      eyebrow: "អ្វីដែលយើងផ្តល់ជូន",
      title: "អ្វីៗដែលអ្នកត្រូវការ រៀបចំឱ្យលឿន។",
      description: "គេហទំព័រនេះជាច្រកចូលទៅកាន់ផលិតផលអ្នកប្រើ៖ មើលសេវា រួចចូលទៅកាន់មុខងារដែលអ្នកត្រូវការ។",
      cta: "បើកអាប់អ្នកប្រើ",
      groupEyebrow: "សម្រាប់អ្នកប្រើ",
      groupTitle: "សេវាប្រចាំថ្ងៃ",
      cards: [
        ["កក់ជិះ", "កក់ការធ្វើដំណើរក្នុងទីក្រុងឥឡូវនេះ ឬកំណត់ពេលសម្រាប់ពេលក្រោយ។"],
        ["ដឹកជញ្ជូន", "ផ្ញើកញ្ចប់ជាមួយព័ត៌មានអ្នកទទួល និងការតាមដានផ្ទាល់។"],
        ["ទិញ / ជួល", "រកមើលយានយន្តសម្រាប់ទិញ ឬជួល ជាមួយតម្រងងាយប្រើ។"],
        ["Charging AI", "ស្វែងរកស្ថានីយល្អបំផុតតាមតម្លៃ ល្បឿន ចម្ងាយ និងភាពទំនេរ។"],
        ["កាបូបលុយ", "គ្រប់គ្រងកាត សមតុល្យ និងប្រវត្តិប្រតិបត្តិការ។"],
        ["សុវត្ថិភាព និងជំនួយ", "ទាក់ទងជំនួយ ចែករំលែកស្ថានភាព និងប្រើឧបករណ៍បន្ទាន់។"],
      ],
    },
    charging: {
      eyebrow: "ភាពឆ្លាតវៃនៃការសាកថ្ម",
      title: "ឈប់សាក EV ឱ្យឆ្លាត មុនពេលថ្មក្លាយជាបញ្ហា។",
      description: "Charging AI ប្រៀបធៀបចម្ងាយ ល្បឿន តម្លៃ និងភាពទំនេរ រួចបំលែងស្ថានីយល្អបំផុតទៅជាផ្លូវផ្ទាល់។",
      impact: ["ឧបករណ៍អ្នកប្រើក្នុងអាប់តែមួយ", "ពេលរង់ចាំគំរូ", "ស្ថានីយសាកជិតអ្នក", "ចំណូលថ្ងៃគំរូរបស់អ្នកបើកបរ"],
      cardEyebrow: "ព័ត៌មានស្ថានីយផ្ទាល់",
      cardTitle: "អាប់ណែនាំកន្លែងសាកល្អបំផុត មុនពេលអ្នកបើកចេញ។",
      stationRows: ["លឿនបំផុត៖ 150 kW", "តម្លៃល្អបំផុត៖ $0.28/kWh", "ជិតបំផុត៖ 0.8 mi"],
    },
    highlights: {
      eyebrow: "ចំណុចពិសេសរបស់វេទិកា",
      title: "ឧបករណ៍ទំនើបលើសពីការកក់ជិះ។",
      cta: "បើក Charging AI",
      cards: [
        ["Charging AI មានក្នុងអាប់ជានិច្ច", "អាប់ណែនាំស្ថានីយតាមភាពទំនេរផ្ទាល់ តម្លៃ ចម្ងាយ និងល្បឿនសាក។"],
        ["ការធ្វើដំណើរផ្តោតលើសុវត្ថិភាព", "លំហូរអ្នកប្រើ និងអ្នកបើកបរមានឆាត ទំនាក់ទំនងទុកចិត្ត ការផ្ទៀងផ្ទាត់ និងជំនួយ។"],
        ["ផ្សារលើសពីការកក់ជិះ", "អ្នកប្រើអាចទិញ ឬជួលយានយន្ត រួមជាមួយការកក់ ដឹកជញ្ជូន ទូទាត់ និងសាកថ្ម។"],
      ],
    },
    ready: {
      eyebrow: "រួចរាល់ដើម្បីសាកល្បង",
      title: "ចាប់ផ្តើមជាមួយគណនីអ្នកប្រើរបស់អ្នកថ្ងៃនេះ។",
      login: "ចូលគណនីអ្នកប្រើ",
      create: "បង្កើតគណនី",
    },
    showcase: {
      pickup: "ទទួលនៅផ្សារធំថ្មី",
      arriving: "អ្នកបើកបរមកដល់ក្នុង 4 នាទី",
      routeLabel: "ផ្លូវបច្ចុប្បន្ន",
      route: "ផ្សារធំថ្មី ទៅ មាត់ទន្លេ",
      verified: "បានផ្ទៀងផ្ទាត់",
      wallet: "កាបូបលុយ",
      chargeAi: "Charge AI",
      rows: [
        ["កក់ជិះ", "ផ្សារធំថ្មី ទៅ មាត់ទន្លេ", "4 នាទី"],
        ["ដឹកជញ្ជូន", "កញ្ចប់តូចទៅទួលគោក", "$5.20"],
        ["Charging AI", "Aeon Mall Supercharge", "0.8 mi"],
        ["ការទូទាត់", "Visa បញ្ចប់ដោយ 2048", "រួចរាល់"],
      ],
      cta: "សាកល្បង Charging AI",
    },
    footer: {
      description: "គំរូស៊ុបភើអាប់អ្នកប្រើទំនើប សម្រាប់ការធ្វើដំណើរ ដឹកជញ្ជូន ផ្សារ និង Charging AI។",
      columns: [
        { title: "អ្នកប្រើ", links: ["កក់ជិះ", "ដឹកជញ្ជូន", "ទិញ / ជួល", "Charging AI"] },
        { title: "អាប់", links: ["ទំព័រដើមអ្នកប្រើ", "ឆាត", "ប្រវត្តិរូប"] },
        { title: "គណនី", links: ["ចូលគណនី", "ចុះឈ្មោះ"] },
      ],
    },
  },
} satisfies Record<Locale, HomepageCopy>;
