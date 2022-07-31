import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import pageTitle from '../utils/pageTitle';
import {getHomePage} from '../utils/static-props';
import {useState} from 'react';
import sanityClient from '../utils/sanityClient';
import {queries} from '../constants/queries';
import Button from '../components/Button/Button';
import styles from '../styles/pages/Index.module.scss';

export default function Home(
  homePageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [data, setData] = useState(homePageData.blogList);

  const fetchData = async () => {
    const data: HomePageData = await sanityClient.fetch(queries.HomePage);
    console.log(data.blogList);
    return setData(data.blogList);
  };

  const handleClick = async () => {
    await fetchData();
  };
  return (
    <>
      <NextSeo
        title={pageTitle(homePageData.pageTitle)}
        description={homePageData.metaDescription}
      />
      <BlogList list={homePageData.blogList} />
      <div className={styles.buttonContainer}>
        <Button
          label="Load More"
          variant={'orange'}
          arrowOptions={'none'}
          onClickPreventDefault={async () => await handleClick}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageData> = async (context) =>
  getHomePage(context);
