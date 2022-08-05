import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import {NextSeo} from 'next-seo';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import pageTitle from '../utils/pageTitle';
import {getDefaultHomePage, getTaggedBlogPreviews} from '../utils/static-props';

export default function Home(
  homePageData: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(homePageData.pageTitle)}
        description={homePageData.metaDescription}
      />
      <BlogList
        list={homePageData.blogList}
        totalCount={homePageData.totalCount}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageData> = async (
  context
) => {
  let data;
  'tag' in context.query
    ? (data = await getTaggedBlogPreviews(context.query.tag!))
    : (data = await getDefaultHomePage());
  return {
    props: data,
  };
};
