import { getRequestConfig } from 'next-intl/server';

const locales = ['es', 'en', 'it'] as const;
type AppLocale = (typeof locales)[number];

function isSupportedLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isSupportedLocale(locale)) {
    locale = 'es';
  }

  const baseMessages = (await import(`./messages/${locale}.json`)).default;
  const cvPackLocale = locale === 'es' ? 'es' : locale === 'it' ? 'it' : 'en';
  const cvPack = (await import(`./messages/cvOctavio.${cvPackLocale}.json`)).default;

  return {
    locale,
    messages: {
      ...baseMessages,
      cvOctavio: cvPack.cvOctavio,
    },
  };
});
