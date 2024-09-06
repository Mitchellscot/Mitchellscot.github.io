import Hobby from './Hobby';
import ImageModel from './ImageModel';

export default interface AboutPageData {
  pageTitle: string;
  metaDescription: string;
  title: string;
  profilePicture: ImageModel;
  introText: string;
  introImage: ImageModel;
  introCaption: string;
  hobbies: Array<Hobby>;
}
