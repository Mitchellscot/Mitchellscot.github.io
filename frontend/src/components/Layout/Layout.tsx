import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HeaderNav from '../HeaderNav/HeaderNav';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LegacyLayout(props: LayoutProps) {
  const {children} = props;

  return (
    <div className={styles.site}>
      <div className={styles.siteHeader}>
        <Header />
      </div>
      <div className={styles.siteNav}>
        <HeaderNav />
      </div>
      <main className={styles.siteBody}>{children}</main>
      <div className={styles.siteFooter}>
        <Footer />
      </div>
    </div>
  );
}
