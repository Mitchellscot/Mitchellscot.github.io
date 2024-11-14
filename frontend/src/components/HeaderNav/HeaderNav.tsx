import classNames from 'classnames';
import Link from 'next/link';
import text from '../../styles/typography/Text.module.scss';
import styles from './HeaderNav.module.scss';

type PathOptions = '/' | 'blog' | 'projects' | 'stats' | 'about' | 'contact';

export default async function HeaderNav({path = '/'}) {
  const pathName = path;
  const navItem = classNames(styles.navItem, text.textMd);
  const navItemActive = classNames(styles.navItemActive, text.textMd);

  const blogLinkIsActive = pathName === '/' || pathName === 'blog';
  return (
    <nav className={styles.container}>
      <ol className={styles.navLinks}>
        <li>
          <Link href="/" passHref legacyBehavior>
            <a className={blogLinkIsActive ? navItemActive : navItem}>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/projects" passHref legacyBehavior>
            <a className={pathName === 'projects' ? navItemActive : navItem}>
              Projects
            </a>
          </Link>
        </li>
        <li>
          <Link href="/stats" passHref legacyBehavior>
            <a className={pathName === 'stats' ? navItemActive : navItem}>
              Stats
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref legacyBehavior>
            <a className={pathName === 'about' ? navItemActive : navItem}>
              About
            </a>
          </Link>
        </li>
        <li>
          <Link href="/contact" passHref legacyBehavior>
            <a className={pathName === 'contact' ? navItemActive : navItem}>
              Contact
            </a>
          </Link>
        </li>
      </ol>
    </nav>
  );
}
