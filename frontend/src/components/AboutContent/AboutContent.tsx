import classNames from 'classnames';
import ImageModel from '../../models/ImageModel';
import styles from './AboutContent.module.scss';
import typography from '../../styles/typography/Text.module.scss';
import Image from 'next/image';

interface AboutContentProps {
  summary: string;
  image: ImageModel;
  caption: string;
}

export default function AboutContent({
  summary,
  image,
  caption,
}: AboutContentProps) {
  const summaryText = classNames(styles.summary, typography.textMd);
  return (
    <div className={styles.container}>
      <p className={summaryText}>{summary}</p>
      {image.url && (
        <>
          <figure className={styles.imageContainer}>
            <Image
              src={image.url}
              height={image.height}
              width={image.width}
              alt={image.alt}
            />
          </figure>
          <figcaption className={styles.caption}>{caption}</figcaption>
        </>
      )}
    </div>
  );
}
