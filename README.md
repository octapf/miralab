# IT Services Portfolio

Modern Next.js 14+ portfolio website for IT services with TypeScript, App Router, and internationalization.

## Features

- ✨ **Modern Stack**: Next.js 14+, TypeScript, App Router
- 🎨 **Styling**: SASS/SCSS with modern, responsive design
- 🌍 **Internationalization**: next-intl (Spanish default, English)
- 🎭 **Animations**: Framer Motion for smooth transitions
- 📱 **Carousel**: Swiper.js for portfolio showcase
- 🌓 **Theme**: Dark/light mode (dark default) with violet/purple accent
- 📄 **SPA**: Single page with smooth scroll navigation
- 🎯 **Navbar**: Auto-hide on scroll down
- 🎯 **Sections**: Hero, Services, Portfolio, Contact
- 📊 **Portfolio**: Managed via TypeScript data file
- 🇪🇸 **Content**: All placeholder text in Spanish

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

The default language is Spanish. Access English version at [http://localhost:3000/en](http://localhost:3000/en).

## WhatsApp webhook (local + ngrok)

Guía paso a paso para probar el bot localmente (sin Vercel):

- [WHATSAPP-LOCAL-NGROK.md](WHATSAPP-LOCAL-NGROK.md)

Plan B (Twilio WhatsApp Sandbox):

- [TWILIO-WHATSAPP.md](TWILIO-WHATSAPP.md)

Script helper (Windows):

- [start-whatsapp-local.ps1](start-whatsapp-local.ps1)

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   └── [locale]/          # Internationalized routes
│   ├── components/
│   │   ├── Navbar/            # Navigation with scroll behavior
│   │   ├── Hero/              # Landing section
│   │   ├── Services/          # Services showcase
│   │   ├── Portfolio/         # Projects carousel
│   │   └── Contact/           # Contact form & WhatsApp
│   ├── contexts/
│   │   └── ThemeContext.tsx   # Dark/light mode management
│   ├── data/
│   │   └── portfolio.ts       # Portfolio projects data
│   └── styles/
│       └── globals.scss       # Global styles & theme variables
├── messages/
│   ├── es.json                # Spanish translations
│   └── en.json                # English translations
├── i18n.ts                    # Internationalization config
└── middleware.ts              # Locale routing middleware
```

## Customization

### Portfolio Projects

Edit `src/data/portfolio.ts` to update projects:

```typescript
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    image: "/images/project1.jpg",
    techStack: ["Next.js", "TypeScript"],
    link: "https://example.com"
  },
  // Add more projects...
];
```

### Theme Colors

Modify color variables in `src/styles/globals.scss`:

```scss
:root {
  --color-violet: #8b5cf6;
  --color-purple: #a855f7;
  // ...
}
```

### Translations

Update content in `messages/es.json` and `messages/en.json`.

### WhatsApp Contact

Update phone number in `src/components/Contact/Contact.tsx`:

```typescript
const phoneNumber = '1234567890'; // Replace with your number
```

## Technologies

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: SASS/SCSS
- **Animations**: Framer Motion
- **Carousel**: Swiper.js
- **i18n**: next-intl

## Sections

1. **Hero/Home**: Eye-catching landing with animated gradient background
2. **Services**: 3 service cards (Web Dev, Mobile Apps, IT Consulting)
3. **Portfolio**: Swiper carousel with 6 project cards
4. **Contact**: Email form + WhatsApp button

## Responsive Design

Fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
