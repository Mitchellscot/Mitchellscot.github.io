import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import text from '../../styles/typography/Text.module.scss';
import styles from './Footer.module.scss';

export default function Footer() {
  const copyrightText = classNames(styles.copyright, text.textXs);
  const year = new Date().getFullYear;
  return (
    <footer className={styles.container}>
      <p className={copyrightText}>
        &copy;{` ${year} Mitchell Scott. All rights reserved`}
      </p>
      <div className={styles.socialLinks}>
        <Link href="https://www.strava.com/athletes/mitchellscot">
          <a target="_blank">
            <Image src="/strava.svg" height="40" width="40" alt="" />
          </a>
        </Link>
        <Link href="https://twitter.com/_mitchellscot">
          <a target="_blank">
            <Image src="/twitter.svg" height="40" width="40" alt="" />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/mitchellscot">
          <a target="_blank">
            <Image src="/linkedIn.svg" height="40" width="40" alt="" />
          </a>
        </Link>
        <Link href="https://github.com/Mitchellscot">
          <a target="_blank">
            <Image src="/github.svg" height="40" width="40" alt="" />
          </a>
        </Link>
      </div>
    </footer>
  );
}
