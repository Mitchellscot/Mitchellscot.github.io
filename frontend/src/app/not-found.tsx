import headings from '../styles/typography/Heading.module.scss';
import typography from '../styles/typography/Text.module.scss';
import styles from '../styles/pages/404.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Page Not Found',
};

export default function NotFound() {
  const titleText = classNames(styles.title, headings.heading2);
  const text = classNames(styles.words, typography.textMd);
  return (
    <>
      <div className={styles.container}>
        <h1 className={titleText}>That page does not exist.</h1>
        <p className={text}>
          {`Why don\'t you just `}
          <Link href={'/'} legacyBehavior>
            <a className={styles.link}>Go Home.</a>
          </Link>
        </p>
      </div>
    </>
  );
}
