import Project from './Project';

export default interface ProjectsPageData {
  pageTitle: string;
  metaDescription: string;
  title: string;
  projects: Array<Project>;
}
