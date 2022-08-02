import classNames from 'classnames';
import ImageModel from '../../models/ImageModel';
import styles from './AboutHeadline.module.scss';
import headings from '../../styles/typography/Heading.module.scss';
import Image from 'next/image';

interface AboutHeadlineProps {
  title: string;
  profilePicture: ImageModel;
}

export default function AboutHeadline({
  title,
  profilePicture,
}: AboutHeadlineProps) {
  const titleText = classNames(styles.title, headings.heading1);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={profilePicture.url}
            height={profilePicture.height}
            width={profilePicture.width}
            alt={profilePicture.alt}
            priority
          />
        </div>
        <div className={titleText}>{title}</div>
      </div>
    </div>
  );
}
