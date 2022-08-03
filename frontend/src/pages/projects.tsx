import classNames from 'classnames';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import Project from '../components/Project/Project';
import ProjectsPageData from '../models/ProjectsPageData';
import styles from '../styles/pages/Projects.module.scss';
import headings from '../styles/typography/Heading.module.scss';
import pageTitle from '../utils/pageTitle';
import {getProjectsPage} from '../utils/static-props';

export default function Projects(
  projectsPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  const titleText = classNames(headings.heading2, styles.title);
  return (
    <>
      <NextSeo
        title={pageTitle(projectsPageData.pageTitle)}
        description={projectsPageData.metaDescription}
      />
      <div className={styles.container}>
        {/* <div className={titleText}>{projectsPageData.title}</div> */}
        <div className={styles.projectsContainer}>
          {projectsPageData.projects.map((project, index) => {
            const isLast = projectsPageData.projects.length === index + 1;
            return <Project key={index} project={project} drawLine={!isLast} />;
          })}
        </div>
      </div>
    </>
  );
}
type NewType = GetStaticProps<ProjectsPageData>;

export const getStaticProps: NewType = async (context) =>
  getProjectsPage(context);
