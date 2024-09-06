import classNames from 'classnames';
import styles from './Hobbies.module.scss';
import headings from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import Image from 'next/legacy/image';
import Hobby from './Hobby';

interface HobbiesProps {
  hobbies: Array<Hobby>;
}

export default function Hobbies({hobbies}: HobbiesProps) {
  const titleText = classNames(styles.title, headings.heading1);
  const hobbyNameText = classNames(styles.hobbyName, text.textMd);
  return (
    <div className={styles.container}>
      <h2 className={titleText}>Hobbies</h2>
      <div className={styles.hobbiesContainer}>
        {hobbies.map((hobby: Hobby, index: number) => {
          return (
            <div className={styles.hobby} key={index}>
              <figure className={styles.imageContainer}>
                <Image
                  src={hobby.hobbyImage.url}
                  height={hobby.hobbyImage.height}
                  width={hobby.hobbyImage.width}
                  alt={hobby.hobbyImage.alt}
                />
              </figure>
              <figcaption className={hobbyNameText}>{hobby.name}</figcaption>
            </div>
          );
        })}
      </div>
    </div>
  );
}
