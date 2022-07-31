import {PortableTextReactComponents} from '@portabletext/react';
import Link from 'next/link';
import styles from './PortableText.module.scss';

const PortableText: Partial<PortableTextReactComponents> = {
  block: ({children}) => <p className={styles.paragraph}>{children}</p>,
  marks: {
    internalLink: ({value, children}) => {
      const {slug} = value;
      const href = `/blog/${slug}`;
      return (
        <Link href={href} passHref>
          <a className={styles.link}>{children}</a>
        </Link>
      );
    },
    externalLink: ({value, children}) => {
      const {blank, href} = value;
      return blank ? (
        <Link href={href} passHref>
          <a className={styles.link} target="_blank" rel="noreferrer">
            {children}
          </a>
        </Link>
      ) : (
        <Link href={href} passHref>
          <a className={styles.link}>{children}</a>
        </Link>
      );
    },
    highlight: ({children}) => {
      return <span className={styles.highlight}>{children}</span>;
    },
  },
};

export default PortableText;
