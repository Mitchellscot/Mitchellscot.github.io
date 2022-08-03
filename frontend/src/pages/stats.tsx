import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import StatsPageData from '../models/StatsPageData';
import pageTitle from '../utils/pageTitle';
import {getStatsPage} from '../utils/static-props';
import headings from '../styles/typography/Heading.module.scss';
import styles from '../styles/pages/StatsPage.module.scss';
import classNames from 'classnames';

export default function Stats(
  statsPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  const titleText = classNames(styles.title, headings.heading2);
  return (
    <>
      <NextSeo
        title={pageTitle(statsPageData.pageTitle)}
        description={statsPageData.metaDescription}
      />
      <div className={styles.container}>
        <div className={titleText}>{statsPageData.title}</div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<StatsPageData> = async (context) =>
  getStatsPage(context);
