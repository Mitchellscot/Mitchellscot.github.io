import {DefaultSeo} from 'next-seo';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Layout from '../components/LegacyLayout/LegacyLayout';
import '../styles/index.scss';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {Analytics} from '@vercel/analytics/react';
import {Ubuntu, Ubuntu_Mono} from 'next/font/google';

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-ubuntu',
});
export const ubuntu_mono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-ubuntu-mono',
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <DefaultSeo
          title="Mitchell Scott"
          description="Software Engineer Central Minnesota"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
      >
        <Layout>
          <Component
            className={`${ubuntu.variable} ${ubuntu_mono.variable}`}
            {...pageProps}
          />
        </Layout>
      </GoogleReCaptchaProvider>
      <Analytics />
    </>
  );
}
