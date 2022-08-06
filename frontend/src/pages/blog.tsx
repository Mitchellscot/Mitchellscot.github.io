import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {NextSeo} from 'next-seo';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import pageTitle from '../utils/pageTitle';
import {getDefaultHomePage, getTaggedBlogPreviews} from '../utils/static-props';
import styles from '../styles/pages/Blog.module.scss';
import Link from 'next/link';
import Button from '../components/Button/Button';

export default function Home(
  homePageData: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(homePageData.pageTitle)}
        description={homePageData.metaDescription}
      />
      <div className={styles.buttonContainer}>
        <Button label="All Tags" link="/blog/tags" variant="blue" />
      </div>
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
