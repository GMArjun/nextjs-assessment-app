'use client';
import '@/styles/global.css';
import type { Metadata } from 'next';
import { RecoilRoot } from 'recoil';
export const metadata: Metadata = {
  title: 'Arjun | Next.js | HyperHire',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
