import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Justin — Give someone you love a gift of your voice',
  description:
    'Record voice messages for the people who matter, and choose when they open. A birthday, a hard day, or whenever they need to hear you.',
  metadataBase: new URL('https://www.justinapp.com.au'),
  openGraph: {
    type: 'website',
    url: 'https://www.justinapp.com.au',
    title: 'Justin — Give someone you love a gift of your voice',
    description:
      'Record voice messages for the people who matter, and choose when they open. A birthday, a hard day, or whenever they need to hear you.',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin — Give someone you love a gift of your voice',
    description:
      'Record voice messages for the people who matter, and choose when they open. A birthday, a hard day, or whenever they need to hear you.',
    images: ['/assets/og-image.png'],
  },
  icons: {
    icon: '/assets/justin-logo.png',
    apple: '/assets/justin-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
