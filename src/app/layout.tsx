import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SNS売上診断｜無料30秒',
  description: 'あなたのSNSが売上に繋がらない原因を30秒で診断します。完全無料・スマホ完結。',
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
