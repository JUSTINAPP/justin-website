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
  title: 'Justin — Leave something to open later',
  description:
    'Record a message for someone you love — your voice, a few photos. They open it on a birthday, a hard day, or whenever they need you.',
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
