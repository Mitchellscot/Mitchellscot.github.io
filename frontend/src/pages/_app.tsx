import {DefaultSeo} from 'next-seo';
import {AppProps} from 'next/app';
import Head from 'next/head';
import LegacyLayout from '../components/LegacyLayout/LegacyLayout';
import '../styles/index.scss';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {Analytics} from '@vercel/analytics/react';

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
        <LegacyLayout>
          <Component {...pageProps} />
        </LegacyLayout>
      </GoogleReCaptchaProvider>
      <Analytics />
    </>
  );
}
