import {GetStaticPathsResult} from 'next';
import queries from '../constants/queries';
import sanityClient from './sanityClient';

interface Slug {
  slug: string;
}

export const blogEntryPaths = async (): Promise<GetStaticPathsResult> => {
  const result: Slug[] = await sanityClient.fetch(queries.GetAllBlogSlugs);
  const allPaths: string[] = result.map((x: Slug) => `/blog/${x.slug}`);
  return {
    fallback: false,
    paths: allPaths,
  };
};
