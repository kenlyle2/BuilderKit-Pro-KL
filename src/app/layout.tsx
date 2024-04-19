import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/utils';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aiboilerplate.com'),
  title: 'AI Boilerplate',
  description: 'Boilerplate for AI Interior Design',
  openGraph: {
    type: 'website',
    title: 'AI Boilerplate',
    description: 'Boilerplate for AI Interior Design',
    images: '/og-image.png',
    url: 'https://aiboilerplate.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Boilerplate',
    description: 'Boilerplate for AI Interior Design',
    images: '/og-image.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
        <body className={cn(font.className, 'bg-[#111111]')}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
