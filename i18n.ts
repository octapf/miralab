import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['es', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as any)) {
    locale = 'es';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
