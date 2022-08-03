import {NextSeo} from 'next-seo';
import pageTitle from '../utils/pageTitle';
import headings from '../styles/typography/Heading.module.scss';
import typography from '../styles/typography/Text.module.scss';
import styles from '../styles/pages/404.module.scss';
import classNames from 'classnames';

export default function FourOhFour() {
  const titleText = classNames(styles.title, headings.heading2);
  const text = classNames(styles.words, typography.textMd);
  return (
    <>
      <NextSeo title={pageTitle('Not Found')} description={'Page Not Found'} />
      <div className={styles.container}>
        <h1 className={titleText}>That page does not exist.</h1>
        <p className={text}>
          {`Why don\'t you just `}
          <a href={'/'} className={styles.link}>
            Go Home.
          </a>
        </p>
      </div>
    </>
  );
}
