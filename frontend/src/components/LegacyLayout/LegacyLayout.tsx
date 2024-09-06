import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LegacyHeaderNav from '../LegacyHeaderNav/LegacyHeaderNav';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function LegacyLayout(props: LayoutProps) {
  const {children} = props;

  return (
    <div className={styles.site}>
      <div className={styles.siteHeader}>
        <Header />
      </div>
      <div className={styles.siteNav}>
        <LegacyHeaderNav />
      </div>
      <main className={styles.siteBody}>{children}</main>
      <div className={styles.siteFooter}>
        <Footer />
      </div>
    </div>
  );
}
