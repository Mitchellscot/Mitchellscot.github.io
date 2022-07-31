import {useState} from 'react';
import BlogPreviewModel from '../../models/BlogPreview';
import {getMoreBlogPosts} from '../../utils/static-props';
import BlogPreview from '../BlogPreview/BlogPreview';
import Button from '../Button/Button';
import styles from './BlogList.module.scss';

interface BlogListProps {
  list: Array<BlogPreviewModel>;
}

export default function BlogList({list}: BlogListProps) {
  //TODO: Get a count of all blog posts and compare with the length of the array
  //if they are the same, don't display the load more button
  //also, improve the query by getting the last id of the blog preview.
  //see https://www.sanity.io/docs/paginating-with-groq for faster pagination.

  const [blogs, setBlogs] = useState(list);

  async function handleClick() {
    const newBlogs = await getMoreBlogPosts();
    setBlogs([...blogs, ...newBlogs]);
  }
  return (
    <div className={styles.container}>
      {blogs.map((blog, index) => {
        return <BlogPreview {...blog} key={index} />;
      })}
      <div className={styles.buttonContainer}>
        <Button
          label="Load More"
          variant={'orange'}
          arrowOptions={'none'}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
