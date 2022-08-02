import {GetStaticProps} from 'next';
import queries from '../constants/queries';
import {generateBlogEntryQuery} from '../constants/queryHelpers';
import AboutPageData from '../models/AboutPageData';
import BlogEntryData from '../models/BlogEntryData';
import HomePageData from '../models/HomePageData';
import ProjectsPageData from '../models/ProjectsPageData';
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
  return {
    props: data,
    revalidate: revalidateIntervalInSeconds,
  };
};
export const getProjectsPage: GetStaticProps<ProjectsPageData> = async () => {
  const data: ProjectsPageData = await sanityClient.fetch(queries.ProjectsPage);
  console.log(data);
  return {
    props: data,
    revalidate: revalidateIntervalInSeconds,
  };
};

export const getBlogEntry: GetStaticProps<BlogEntryData> = async (context) => {
  const data = await sanityClient.fetch(
    generateBlogEntryQuery(context.params!.slug as string)
  );
  console.log(data);
  return {
    props: data,
    revalidate: revalidateIntervalInSeconds,
  };
};
