import {Analytics} from '@vercel/analytics/react';
import {Ubuntu, Ubuntu_Mono} from 'next/font/google';
import '../styles/index.scss';
import {SpeedInsights} from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Blog | Mitchell Scott',
  description: "Mitchell Scott's Software Blog",
};

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu',
});
const ubuntu_mono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu-mono',
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({children}: Props) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntu_mono.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/favicon/site.webmanifest"></link>
      </head>
      <body>{children}</body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
