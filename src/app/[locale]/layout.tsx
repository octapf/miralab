import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Background from '@/components/Background/Background';
import '@/styles/globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MIRALAB: Estudio de Innovación Digital y Desarrollo Web',
  description: 'Transformamos tus ideas en software de calidad. Desarrollo web, aplicaciones móviles y consultoría IT desde Argentina.',
  keywords: 'desarrollo web, aplicaciones móviles, consultoría IT, transformación digital, MIRALAB',
  authors: [{ name: 'MIRALAB' }],
  icons: {
    icon: [
      { url: '/favicon.ico?v=20251228' },
      { url: '/favicon-16x16.png?v=20251228', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=20251228', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=20251228', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=20251228',
  },
  openGraph: {
    title: 'MIRALAB: Estudio de Innovación Digital y Desarrollo Web',
    description: 'Transformamos tus ideas en software de calidad. Desarrollo web, aplicaciones móviles y consultoría IT desde Argentina.',
    url: 'https://miralab.ar',
    siteName: 'MIRALAB',
    images: [
      {
        url: 'https://miralab.ar/images/miralab-og.jpg',
        width: 1200,
        height: 630,
        alt: 'MIRALAB — Innovación Digital & Desarrollo de Software',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MIRALAB: Estudio de Innovación Digital y Desarrollo Web',
    description: 'Transformamos tus ideas en software de calidad. Desarrollo web, aplicaciones móviles y consultoría IT desde Argentina.',
    images: ['https://miralab.ar/images/miralab-og.jpg'],
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Background />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
