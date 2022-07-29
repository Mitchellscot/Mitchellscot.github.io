import BlogPreviewModel from '../../models/BlogPreview';
import BlogPreview from '../BlogPreview/BlogPreview';
import Button from '../Button/Button';
import styles from './BlogList.module.scss';

interface BlogListProps {
  list: Array<BlogPreviewModel>;
}

export default function BlogList({list}: BlogListProps) {
  return (
    <div className={styles.container}>
      {list.map((blog, index) => {
        return <BlogPreview {...blog} key={index} />;
      })}
      <Button
        label="Load More"
        link="/blog"
        variant={'orange'}
        arrowOptions={'none'}
      />
    </div>
  );
}
