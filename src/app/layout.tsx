// This is a global layout component that wraps the entire application.
// It includes the theme provider, Google Analytics, and the Toaster component.

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const font = Inter({ subsets: ['latin'] });

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://builderkit.ai'),
  title: 'BuilderKit',
  description: 'Boilerplate for Interiod Design Generatoer',
  openGraph: {
    type: 'website',
    title: 'BuilderKit',
    description: 'Boilerplate for Interiod Design Generatoer',
    images: '/og-image.png',
    url: 'https://builderkit.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuilderKit',
    description: 'Boilerplate for Interiod Design Generatoer',
    images: '/og-image.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Analytics for tracking user interactions */}
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`}
      />
      <Script strategy='lazyOnload' id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}', {
          page_path: window.location.pathname,
          });
      `}
      </Script>

      <html lang='en'>
        <body className={font.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
