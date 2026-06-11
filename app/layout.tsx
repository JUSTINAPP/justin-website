import type { Metadata } from 'next';
import { Nunito, Inter } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Justin — Your people, saved for when you need them',
  description:
    'Justin gives the people who love you a private place to leave messages, voice notes and photos — ready for the moment you need them most.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
