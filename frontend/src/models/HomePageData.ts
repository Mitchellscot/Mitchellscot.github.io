import BlogPreview from './BlogPreview';

export default interface HomePageData {
  pageTitle: string;
  metaDescription: string;
  title: string;
  blogList: Array<BlogPreview>;
  totalCount: number;
}
