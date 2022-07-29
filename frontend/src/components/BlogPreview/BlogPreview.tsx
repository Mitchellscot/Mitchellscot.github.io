import classNames from 'classnames';
import Link from 'next/link';
import model from '../../models/BlogPreview';
import headers from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import Button from '../Button/Button';
import styles from './BlogPreview.module.scss';

export default function BlogPreview({
  slug,
  preview,
  publishDate,
  title,
}: model) {
  const titleText = classNames(styles.title, headers.blogPreview);
  const previewText = classNames(styles.preview, text.textMd);
  const dateText = classNames(styles.date, text.textMd);
  const date = new Date(publishDate);
  return (
    <div className={styles.container}>
      <p className={titleText}>
        <Link href={`blog/${slug}`} passHref>
          {title}
        </Link>
      </p>
      <p className={previewText}>{preview}</p>
      <div className={styles.bottomContainer}>
        <p className={dateText}>
          {date.toLocaleDateString(`en-us`, {dateStyle: 'medium'})}
        </p>
        <Button variant={'transparent'} label="Read It" link={`blog/${slug}`} />
      </div>

      <div className={styles.titleUnderline}></div>
    </div>
  );
}
