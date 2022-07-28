import {GetStaticProps} from 'next';
import {queries} from '../constants/queries';
import AboutPageData from '../models/AboutPageData';
import HomePageData from '../models/HomePageData';
import sanityClient from './sanityClient';

const revalidateIntervalInSeconds = Number(
    process.env.NEXT_REVALIDATE_INTERVAL ?? 60
  );

export const getAboutPage: GetStaticProps<AboutPageData> = async () => {
    const data: AboutPageData = await sanityClient.fetch(queries.AboutPage);
    return {
      props: data,
      revalidate: revalidateIntervalInSeconds,
    };
  };

  export const getHomePage: GetStaticProps<HomePageData> = async () => {
    const data: HomePageData = await sanityClient.fetch(queries.HomePage);
    console.log(data);
    return {
      props: data,
      revalidate: revalidateIntervalInSeconds,
    };
  };