import ImageModel from './ImageModel';

export default interface BlogEntryData {
  pageTitle: string;
  metaDescription: string;
  title: string | null;
  publishDate: string;
  text: [];
  image: ImageModel;
}
