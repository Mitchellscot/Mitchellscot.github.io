import {DefaultSeo} from 'next-seo';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import '../styles/index.scss';

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </>
  );
}
