import classNames from 'classnames';
import Project from './Project/Project';
import ProjectsPageData from '../../models/ProjectsPageData';
import styles from './page.module.scss';
import headings from '../../styles/typography/Heading.module.scss';

import queries from '../../constants/queries';
import { Metadata } from 'next';
import { fetchSanityData } from '../../utils/sanityClient';

export const metadata: Metadata = {
  title: 'Projects | Mitchell Scott',
  description: "Mitchell Scott's Software Projects",
};

async function getProjectsPage(): Promise<ProjectsPageData | null> {
  const data = await fetchSanityData<ProjectsPageData>(queries.ProjectsPage);
  return data;
}

export default async function Projects() {
  const data = await getProjectsPage();
  if (!data)
    return null; //TODO: 404 page
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
