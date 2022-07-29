import classNames from 'classnames';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import headers from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import styles from './Header.module.scss';

export default function Header() {
  const router: NextRouter = useRouter();
  const headingText = classNames(headers.heading1, styles.myName);
  const navItem = classNames(styles.navItem, text.textMd);
  const navItemActive = classNames(styles.navItemActive, text.textMd);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={headingText}>
          Mitchell Scott<div className={styles.titleUnderline}></div>
        </div>
        <nav>
          <ol className={styles.navLinks}>
            <li>
              <Link href="/about" passHref>
                <a
                  className={
                    router.pathname === '/about' ? navItemActive : navItem
                  }
                >
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <a
                  className={
                    router.pathname === '/blog' ? navItemActive : navItem
                  }
                >
                  Blog
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <a
                  className={
                    router.pathname === '/contact' ? navItemActive : navItem
                  }
                >
                  Contact
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects" passHref>
                <a
                  className={
                    router.pathname === '/projects' ? navItemActive : navItem
                  }
                >
                  Projects
                </a>
              </Link>
            </li>
            <li>
              <Link href="/stats" passHref>
                <a
                  className={
                    router.pathname === '/stats' ? navItemActive : navItem
                  }
                >
                  Stats
                </a>
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
