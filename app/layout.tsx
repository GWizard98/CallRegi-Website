import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '@/app/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Call REGI Auto Repair | Expert Auto Service in Miami',
  description: 'Professional auto repair services in Miami. Oil changes, brake service, engine repair, AC service, and more. Call 786-681-2854 for same-day service.',
  keywords: 'auto repair, car service, Miami, oil change, brake repair, engine repair, AC service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
