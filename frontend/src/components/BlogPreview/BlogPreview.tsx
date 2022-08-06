import {triggerAsyncId} from 'async_hooks';
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
  tags,
}: model) {
  const titleText = classNames(styles.title, headers.blogPreview);
  const previewText = classNames(styles.preview, text.textMd);
  const dateText = classNames(styles.date, text.textMd);
  const date = new Date(publishDate);
  const tagText = classNames(styles.tag, text.textMd);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={titleText}>
          <Link href={`blog/${slug}`}>{title}</Link>
        </p>
        <Button variant={'transparent'} label="Read It" link={`blog/${slug}`} />
      </div>

      <p className={previewText}>{preview}</p>
      <div className={styles.bottomContainer}>
        <p className={dateText}>
          {date.toLocaleDateString(`en-us`, {dateStyle: 'medium'})}
        </p>
        <div className={styles.tagList}>
          {tags &&
            tags.map((tag: string, index: number) => {
              return (
                <Link href={{pathname: '', query: {tag: tag}}} key={index}>
                  <a className={tagText}>{tag}</a>
                </Link>
              );
            })}
        </div>
      </div>
      <div className={styles.titleUnderline}></div>
    </div>
  );
}
