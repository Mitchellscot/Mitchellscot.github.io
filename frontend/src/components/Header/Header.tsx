import classNames from 'classnames';
import headers from '../../styles/typography/Heading.module.scss';
import styles from './Header.module.scss';

export default function Header() {
  const headingText = classNames(headers.heading1, styles.myName);

  return (
    <>
      <header className={styles.header}>
        <div className={headingText}>
          <a href="/">Mitchell Scott</a>
          <div className={styles.titleUnderline}></div>
        </div>
      </header>
    </>
  );
}
