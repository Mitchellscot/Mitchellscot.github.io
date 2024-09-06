import classNames from 'classnames';
import Project from './Project/Project';
import ProjectsPageData from '../../models/ProjectsPageData';
import styles from './page.module.scss';
import headings from '../../styles/typography/Heading.module.scss';
import sanityClient from '../../utils/sanityClient';
import queries from '../../constants/queries';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Projects | Mitchell Scott',
  description: "Mitchell Scott's Software Projects",
};

async function getProjectsPage(): Promise<ProjectsPageData> {
  const data: ProjectsPageData = await sanityClient.fetch(queries.ProjectsPage);
  return data;
}

export default async function Projects() {
  const data = await getProjectsPage();
  const titleText = classNames(headings.heading2, styles.title);
  return (
    <>
      <div className={styles.container}>
        {/* <div className={titleText}>{projectsPageData.title}</div> */}
        <div className={styles.projectsContainer}>
          {data.projects.map((project, index) => {
            const isLast = data.projects.length === index + 1;
            return <Project key={index} project={project} drawLine={!isLast} />;
          })}
        </div>
      </div>
    </>
  );
}
