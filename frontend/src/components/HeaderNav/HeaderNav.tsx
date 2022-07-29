import classNames from 'classnames';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import text from '../../styles/typography/Text.module.scss';
import styles from './HeaderNav.module.scss';

export default function HeaderNav() {
  const router: NextRouter = useRouter();
  const navItem = classNames(styles.navItem, text.textMd);
  const navItemActive = classNames(styles.navItemActive, text.textMd);
  //this might not work so you have to watch this one to see
  //if it triggers on /blog/first-blog or whatever.
  const blogLinkIsActive =
    router.pathname === '/' || router.pathname.includes('blog');
  return (
    <nav className={styles.container}>
      <ol className={styles.navLinks}>
        <li>
          <Link href="/" passHref>
            <a className={blogLinkIsActive ? navItemActive : navItem}>Blog</a>
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
              className={router.pathname === '/stats' ? navItemActive : navItem}
            >
              Stats
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <a
              className={router.pathname === '/about' ? navItemActive : navItem}
            >
              About
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
      </ol>
    </nav>
  );
}
