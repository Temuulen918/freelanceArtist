import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Чөлөөт уран бүтээлч, бүтээлийн программ',
  description: 'Бакалаврын судалгааны ажил',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}