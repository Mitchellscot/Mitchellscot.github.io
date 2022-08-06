import {GetStaticProps} from 'next';
import queries from '../constants/queries';
import {
  generateBlogEntryQuery,
  getBlogPreviewsByTag,
} from '../constants/queryHelpers';
import AboutPageData from '../models/AboutPageData';
import BlogEntryData from '../models/BlogEntryData';
import ContactPageData from '../models/ContactPageData';
import HomePageData from '../models/HomePageData';
import ProjectsPageData from '../models/ProjectsPageData';
import StatsPageData from '../models/StatsPageData';
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

export const getContactPage: GetStaticProps<ContactPageData> = async () => {
  const data: ContactPageData = await sanityClient.fetch(queries.ContactPage);
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

export const getDefaultHomePage = async (): Promise<HomePageData> => {
  const data = await sanityClient.fetch<HomePageData>(queries.HomePage);
  return data;
};

export const getTaggedBlogPreviews = async (
  queryString: string | string[]
): Promise<HomePageData> => {
  const queryValue =
    typeof queryString === 'string' ? queryString : queryString[0];
  const acceptableTags = await sanityClient.fetch<Array<string>>(
    queries.GetAllTags
  );

  //if query parameter isn't valid, just return the default page
  if (acceptableTags.indexOf(queryValue) === -1) {
    //maybe add a property here... displayTagNotFound=true or something then set it on the page to display a message.
    return getDefaultHomePage();
  }

  const data = await sanityClient.fetch<HomePageData>(
    getBlogPreviewsByTag(queryValue)
  );
  return data;
};

export const getStatsPage: GetStaticProps<StatsPageData> = async () => {
  const data: StatsPageData = await sanityClient.fetch(queries.StatsPage);
  return {
    props: data,
    revalidate: revalidateIntervalInSeconds,
  };
};

export const getProjectsPage: GetStaticProps<ProjectsPageData> = async () => {
  const data: ProjectsPageData = await sanityClient.fetch(queries.ProjectsPage);
  return {
    props: data,
    revalidate: revalidateIntervalInSeconds,
  };
};

export const getBlogEntry: GetStaticProps<BlogEntryData> = async (context) => {
  const data = await sanityClient.fetch(
    generateBlogEntryQuery(context.params!.slug as string)
  );
  return {
    props: data,
    revalidate: revalidateIntervalInSeconds,
  };
};
