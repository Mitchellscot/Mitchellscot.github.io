import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import AboutPageData from '../models/AboutPageData';
import pageTitle from '../utils/pageTitle';
import {getAboutPage} from '../utils/static-props';

export default function About(
  aboutPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(aboutPageData.pageTitle)}
        description={aboutPageData.metaDescription}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutPageData> = async (context) =>
  getAboutPage(context);
