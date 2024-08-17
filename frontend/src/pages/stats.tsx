import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import pageTitle from '../utils/pageTitle';
import {getStatsPage} from '../utils/static-props';
import headings from '../styles/typography/Heading.module.scss';
import styles from '../styles/pages/StatsPage.module.scss';
import classNames from 'classnames';
import Button from '../components/Button/Button';
import StatsPagePlaceHolderData from '../models/StatsPagePlaceHolderData';

export default function Stats(
  statsPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(statsPageData.pageTitle)}
        description={statsPageData.metaDescription}
      />
      <div className={styles.container}>
        <div className={styles.timeButtonContainer}>
          <Button
            label="Run"
            link="/blog/tags"
            variant="active"
            arrowOptions="none"
            iconOptions="run"
          />
          <Button
            label="Bike"
            link="/blog/tags"
            variant="inactive"
            arrowOptions="none"
            iconOptions="bike"
          />
          <Button
            label="Swim"
            link="/blog/tags"
            variant="inactive"
            arrowOptions="none"
            iconOptions="swim"
          />
          <Button
            label="Other"
            link="/blog/tags"
            variant="inactive"
            arrowOptions="none"
            iconOptions="weights"
          />
        </div>
        <div>Chart goes here</div>
        <div className={styles.timeButtonContainer}>
          <Button
            label="This Month"
            link="/blog/tags"
            variant="transparent"
            arrowOptions="right"
          />
          <Button
            label="This Year"
            link="/blog/tags"
            variant="transparent"
            arrowOptions="right"
          />
          <Button
            label="All Time"
            link="/blog/tags"
            variant="transparent"
            arrowOptions="right"
          />
        </div>
        <div>Total Distance:</div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<StatsPagePlaceHolderData> = async (
  context
) => getStatsPage(context);
