import ButtonModel from './ButtonModel';
import ImageModel from './ImageModel';

export default interface Project {
  title: string;
  image: ImageModel;
  summary: string;
  buttons: Array<ButtonModel>;
}
