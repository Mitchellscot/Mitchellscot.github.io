import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {NextSeo} from 'next-seo';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import pageTitle from '../utils/pageTitle';
import {getDefaultHomePage, getTaggedBlogPreviews} from '../utils/static-props';

//Next does not allow running query parameters on the home URL
//SO I had to make a seperate page /blog so that the url parameters work properly
//it's basically a copy of the home page, but you can run queries on it.
//Also, I didn't want the homepage to redirect to /blog - I wanted a clean looking URL - mitchellscott.me
//You can see this one uses getServerSideProps but the home page is statically built
export default function Blog(
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
