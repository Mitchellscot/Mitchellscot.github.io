import classNames from 'classnames';
import headers from '../../styles/typography/Heading.module.scss';
import styles from './Header.module.scss';
import Link from 'next/link';

export default function Header() {
  const headingText = classNames(headers.heading1, styles.myName);

  return (
    <>
      <header className={styles.header}>
        <div className={headingText}>
          <Link href="/">
            <a>Mitchell Scott</a>
          </Link>
          <div className={styles.titleUnderline}></div>
        </div>
      </header>
    </>
  );
}
