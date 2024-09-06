import classNames from 'classnames';
import Image from 'next/legacy/image';
import ProjectModel from '../../models/Project';
import headers from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import Button from '../Button/Button';
import styles from './Project.module.scss';

interface ProjectProps {
  project: ProjectModel;
  drawLine: boolean;
}

export default function Project({project, drawLine}: ProjectProps) {
  const titleText = classNames(styles.title, headers.blogPreview);
  const summaryText = classNames(styles.summary, text.textMd);
  const buttonContainerStyle = classNames(styles.buttonContainer, {
    [styles.singleButton]: project.buttons.length === 1,
    [styles.manyButtons]: project.buttons.length > 1,
  });
  return (
    <div className={styles.container}>
      <div className={titleText}>{project.title}</div>
      <div className={styles.imageContainer}>
        <Image
          src={project.image.url}
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
        />
      </div>
      <p className={summaryText}>{project.summary}</p>
      <div className={buttonContainerStyle}>
        {project.buttons.map((button, index) => {
          return (
            <Button
              label={button.label}
              variant={button.style}
              link={button.link}
              key={index}
              target="_blank"
            />
          );
        })}
      </div>
      {drawLine && <div className={styles.lowerLine}></div>}
    </div>
  );
}
