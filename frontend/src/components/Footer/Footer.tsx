import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.copyright}>
        &copy;{' 2022 Mitchell Scott. All rights reserved.'}
      </p>
      <div className={styles.socialLinks}>
        <Link href="https://www.strava.com/athletes/mitchellscot" passHref>
          <a target="_blank">
            <Image src="/strava.svg" height="40" width="40" alt="" />
          </a>
        </Link>
        <Link href="https://twitter.com/_mitchellscot" passHref>
          <a target="_blank">
            <Image src="/twitter.svg" height="40" width="40" alt="" />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/mitchellscot" passHref>
          <a target="_blank">
            <Image src="/linkedIn.svg" height="40" width="40" alt="" />
          </a>
        </Link>
        <Link href="https://github.com/Mitchellscot" passHref>
          <a target="_blank">
            <Image src="/github.svg" height="40" width="40" alt="" />
          </a>
        </Link>
      </div>
    </footer>
  );
}
