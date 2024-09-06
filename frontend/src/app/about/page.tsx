import {Metadata} from 'next';
import AboutContent from './AboutContent/AboutContent';
import AboutHeadline from './AboutHeadline/AboutHeadline';
import Hobbies from './Hobbies/Hobbies';
import AboutPageData from '../../models/AboutPageData';
import sanityClient from '../../utils/sanityClient';
import queries from '../../constants/queries';

async function getAboutPage(): Promise<AboutPageData> {
  const data: AboutPageData = await sanityClient.fetch(queries.AboutPage);
  return data;
}

export const metadata: Metadata = {
  title: 'About | Mitchell Scott',
  description: 'About Mitchell Scott - Software Engineer in Minnesota',
};

export default async function About() {
  const data = await getAboutPage();
  return (
    <>
      <AboutHeadline title={data.title} profilePicture={data.profilePicture} />
      <AboutContent
        summary={data.introText}
        image={data.introImage}
        caption={data.introCaption}
      />
      <Hobbies hobbies={data.hobbies} />
    </>
  );
}
