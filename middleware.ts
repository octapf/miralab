import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en', 'it'],
  defaultLocale: 'es'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|matchpoint(?:/.*)?|rize(?:/.*)?|proshop(?:/.*)?|delete-account|.*\\..*).*)']
};
