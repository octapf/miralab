import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en', 'it'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|matchpoint(?:/.*)?|rize(?:/.*)?|proshop(?:/.*)?|privacy|delete-account|.*\\..*).*)']
};
