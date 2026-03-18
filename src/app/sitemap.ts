import type { MetadataRoute } from 'next';

const BASE_URL = 'https://miralab.ar';
const locales = ['es', 'en', 'it'] as const;

function localizedRoutes(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Home
    ...localizedRoutes('', 1.0, 'weekly'),

    // Matchpoint
    ...localizedRoutes('/matchpoint', 0.9, 'monthly'),
    ...localizedRoutes('/matchpoint/privacy', 0.7, 'yearly'),
    ...localizedRoutes('/matchpoint/delete-account', 0.6, 'yearly'),

    // Rize
    ...localizedRoutes('/rize', 0.8, 'monthly'),
    ...localizedRoutes('/rize/privacy', 0.6, 'yearly'),
    ...localizedRoutes('/rize/delete-account', 0.5, 'yearly'),

    // Proshop
    ...localizedRoutes('/proshop', 0.8, 'monthly'),
    ...localizedRoutes('/proshop/privacy', 0.6, 'yearly'),
    ...localizedRoutes('/proshop/delete-account', 0.5, 'yearly'),

    // Global
    ...localizedRoutes('/privacy', 0.7, 'yearly'),
    ...localizedRoutes('/terminos', 0.6, 'yearly'),
  ];
}
