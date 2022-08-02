import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import AboutContent from '../components/AboutContent/AboutContent';
import AboutHeadline from '../components/AboutHeadline/AboutHeadline';
import Hobbies from '../components/Hobbies/Hobbies';
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
      <AboutContent
        summary={aboutPageData.introText}
        image={aboutPageData.introImage}
        caption={aboutPageData.introCaption}
      />
      <Hobbies hobbies={aboutPageData.hobbies} />
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutPageData> = async (context) =>
  getAboutPage(context);
