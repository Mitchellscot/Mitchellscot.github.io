import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import AboutHeadline from '../components/AboutHeadline/AboutHeadline';
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
      <AboutHeadline
        title={aboutPageData.title}
        profilePicture={aboutPageData.profilePicture}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutPageData> = async (context) =>
  getAboutPage(context);
