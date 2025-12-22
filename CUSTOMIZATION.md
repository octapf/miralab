# Customization Guide

This guide will help you customize the IT Services Portfolio website for your own use.

## Quick Start Customization

### 1. Update Portfolio Projects

Edit [src/data/portfolio.ts](src/data/portfolio.ts):

```typescript
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Your project description in Spanish",
    image: "/images/your-project.jpg", // Add image to public/images/
    techStack: ["Tech1", "Tech2", "Tech3"],
    link: "https://your-project-url.com"
  },
  // Add more projects...
];
```

### 2. Update Content/Translations

#### Spanish (Default)
Edit [messages/es.json](messages/es.json) to update all Spanish text.

#### English
Edit [messages/en.json](messages/en.json) to update all English text.

### 3. Update WhatsApp Contact

Edit [src/components/Contact/Contact.tsx](src/components/Contact/Contact.tsx):

```typescript
const phoneNumber = 'YOUR_PHONE_NUMBER'; // Format: 1234567890 (no + or spaces)
```

Or use environment variable in `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
```

### 4. Customize Theme Colors

Edit [src/styles/globals.scss](src/styles/globals.scss):

```scss
:root {
  --color-violet: #8b5cf6;  // Change to your primary color
  --color-purple: #a855f7;  // Change to your secondary color
}
```

### 5. Update Site Metadata

Edit [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx):

```typescript
export const metadata = {
  title: 'Your Company Name',
  description: 'Your description',
};
```

### 6. Add Project Images

1. Place images in `public/images/`
2. Recommended size: 1200x800px
3. Format: JPG or PNG
4. Keep files under 500KB for performance

### 7. Customize Services

Edit the services section in [messages/es.json](messages/es.json) and [messages/en.json](messages/en.json):

```json
{
  "services": {
    "webDev": {
      "title": "Your Service",
      "description": "Your description"
    }
    // Update other services...
  }
}
```

To change service icons, edit [src/components/Services/Services.tsx](src/components/Services/Services.tsx):

```typescript
const serviceIcons = {
  webDev: '🎨', // Change emoji
  mobileDev: '📱',
  consulting: '💡'
};
```

## Advanced Customization

### Add New Sections

1. Create component in `src/components/YourSection/`
2. Import in `src/app/[locale]/page.tsx`
3. Add translations to message files
4. Add navigation link in Navbar component

### Modify Animations

Animations use Framer Motion. Edit motion props in component files:

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

### Change Fonts

Update in [src/styles/globals.scss](src/styles/globals.scss):

```scss
body {
  font-family: 'Your Font', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

Don't forget to import the font in your layout or add it via Google Fonts.

### Add More Languages

1. Create new message file: `messages/fr.json` (for French, etc.)
2. Update [i18n.ts](i18n.ts):
   ```typescript
   const locales = ['es', 'en', 'fr'];
   ```
3. Update [middleware.ts](middleware.ts):
   ```typescript
   locales: ['es', 'en', 'fr']
   ```

### Customize Navbar Behavior

Edit scroll behavior in [src/components/Navbar/Navbar.tsx](src/components/Navbar/Navbar.tsx):

```typescript
// Change when navbar hides
if (currentScrollY > lastScrollY && currentScrollY > 100) { // Adjust 100
  setIsVisible(false);
}
```

### Portfolio Carousel Settings

Edit Swiper configuration in [src/components/Portfolio/Portfolio.tsx](src/components/Portfolio/Portfolio.tsx):

```typescript
<Swiper
  spaceBetween={30}        // Space between slides
  slidesPerView={1}        // Slides visible
  autoplay={{ delay: 5000 }} // Auto-scroll delay
  // ... other settings
/>
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build command:
```bash
npm run build
```

Output directory:
```
.next
```

Start command:
```bash
npm start
```

## Troubleshooting

### Build Errors

Check:
- All imports are correct
- All required packages are installed
- TypeScript errors with `npm run build`

### Styling Issues

- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Check SCSS syntax

### i18n Not Working

- Verify locale files exist in `messages/`
- Check middleware.ts configuration
- Ensure locale is in URL: `/es` or `/en`

## Need Help?

1. Check the [README.md](README.md)
2. Review Next.js documentation
3. Check component files for inline comments
