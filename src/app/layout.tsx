import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nutrianalyzer',
  description: 'Nutrianalyzer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${workSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
