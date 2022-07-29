import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import HomePageData from '../models/HomePageData';
import styles from '../styles/pages/Index.module.scss';
import pageTitle from '../utils/pageTitle';
import {getHomePage} from '../utils/static-props';

export default function Blog(
  homePageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(homePageData.pageTitle)}
        description={homePageData.metaDescription}
      />
      <div className={styles.container}>First</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
      <div className={styles.container}>Hello Mitchell!</div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageData> = async (context) =>
  getHomePage(context);
