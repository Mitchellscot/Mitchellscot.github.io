import {PortableTextReactComponents} from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import headings from '../../styles/typography/Heading.module.scss';
import styles from './PortableText.module.scss';

const PortableText: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({children}) => <p className={styles.paragraph}>{children}</p>,
    h3: ({children}) => (
      <h3 className={`${styles.paragraph} ${headings.heading3}`}>{children}</h3>
    ),
    blockquote: ({children}) => (
      <blockquote className={styles.quoteBlock}>{children}</blockquote>
    ),
  },
  types: {
    code: ({value}) => {
      const {code, language} = value;
      return (
        <>
          <SyntaxHighlighter
            language={language}
            style={a11yDark}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </>
      );
    },
    image: ({value}) => (
      <div className={styles.imageContainer}>
        <Image
          src={value.url}
          width={value.width}
          height={value.height}
          alt={value.alt}
        />
      </div>
    ),
  },

  list: ({value, children}) =>
    value.listItem === 'bullet' ? <ul>{children}</ul> : <ol>{children}</ol>,
  listItem: ({value, children}) =>
    value.listItem === 'bullet' ? (
      <li className={styles.orderedItem}>{children}</li>
    ) : (
      <li className={styles.numberedItem}>{children}</li>
    ),
  marks: {
    internalLink: ({value, children}) => {
      const {slug} = value;
      const href = `/blog/${slug}`;
      return (
        <Link href={href}>
          <a className={styles.link}>{children}</a>
        </Link>
      );
    },
    externalLink: ({value, children}) => {
      const {blank, href} = value;
      return blank ? (
        <Link href={href}>
          <a className={styles.link} target="_blank" rel="noreferrer">
            {children}
          </a>
        </Link>
      ) : (
        <Link href={href}>
          <a className={styles.link}>{children}</a>
        </Link>
      );
    },
    highlight: ({children}) => {
      return <span className={styles.highlight}>{children}</span>;
    },
    strong: ({children}) => {
      return <strong className={styles.bold}>{children}</strong>;
    },
    em: ({children}) => {
      return <em className={styles.emphasize}>{children}</em>;
    },
  },
};

export default PortableText;
