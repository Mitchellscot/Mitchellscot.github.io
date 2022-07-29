import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import pageTitle from '../utils/pageTitle';
import {getHomePage} from '../utils/static-props';

export default function Home(
  homePageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(homePageData.pageTitle)}
        description={homePageData.metaDescription}
      />
      <BlogList list={homePageData.blogList} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageData> = async (context) =>
  getHomePage(context);
