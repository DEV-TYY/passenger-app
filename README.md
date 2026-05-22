# Passenger App

A Next.js prototype for a user mobility super app. It includes ride booking, delivery, vehicle marketplace, Charging AI, chat, profile, login, register, and localized homepage experiences.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Next.js, usually:

```bash
http://localhost:3000
```

## Build

```bash
npm run build
```

## Fonts

- English: `Inter`
- Khmer: `Noto Sans Khmer`
- Khmer fallbacks: `Khmer OS Battambang`, `Khmer OS`

The font stacks are defined in [app/globals.css](app/globals.css) and the page-level locale font selection is defined in [app/data/homepage-data.ts](app/data/homepage-data.ts).

## Translation Files

Homepage translations and homepage mock data live in:

```bash
app/data/homepage-data.ts
```

Shared app-page translations live in:

```bash
app/data/app-i18n.ts
```

General app mock data lives in:

```bash
app/data/mock-data.ts
```

## Localized Pages

The English/Khmer language switch is available on:

- `/`
- `/login`
- `/register`
- `/booking`
- `/passenger`
- `/passenger/rides`
- `/passenger/delivery`
- `/passenger/marketplace`
- `/passenger/charging`
- `/passenger/chat`
- `/passenger/profile`

To add more translations, add the English phrase and Khmer value to `kmPhrases` in [app/data/app-i18n.ts](app/data/app-i18n.ts), or update `homepageCopy` in [app/data/homepage-data.ts](app/data/homepage-data.ts) for homepage-specific copy.
