import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import ProjectsPageData from '../models/ProjectsPageData';
import pageTitle from '../utils/pageTitle';
import {getProjectsPage} from '../utils/static-props';

export default function Projects(
  projectsPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <NextSeo
        title={pageTitle(projectsPageData.pageTitle)}
        description={projectsPageData.metaDescription}
      />
    </>
  );
}
type NewType = GetStaticProps<ProjectsPageData>;

export const getStaticProps: NewType = async (context) =>
  getProjectsPage(context);
