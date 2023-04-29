import {createClient} from '@sanity/client';
import {useState} from 'react';
import {getMoreBlogs} from '../../constants/queryHelpers';
import BlogPreviewModel from '../../models/BlogPreview';
import BlogPreview from '../BlogPreview/BlogPreview';
import Button from '../Button/Button';
import styles from './BlogList.module.scss';

//change this to production when ready
const publicClient = createClient({
  projectId: 'zdpjfpgh',
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2022-04-18',
  useCdn: true,
});

interface BlogListProps {
  list: Array<BlogPreviewModel>;
  totalCount: number;
}

export default function BlogList({list, totalCount}: BlogListProps) {
  const [blogs, setBlogs] = useState(list);
  const [lastId, setLastId] = useState(blogs[blogs.length - 1]?._id);
  const [lastPublishDate, setLastPublishDate] = useState(
    blogs[blogs.length - 1]?.publishDate
  );

  async function handleClick() {
    const newBlogs: BlogListProps = await publicClient.fetch<BlogListProps>(
      getMoreBlogs(lastPublishDate, lastId)
    );
    setLastId(newBlogs.list[newBlogs.list.length - 1]?._id);
    setLastPublishDate(newBlogs.list[newBlogs.list.length - 1]?.publishDate);
    setBlogs([...blogs, ...newBlogs.list]);
  }

  return (
    <div className={styles.container}>
      {blogs.map((blog, index) => {
        return <BlogPreview {...blog} key={index} />;
      })}

      <div className={styles.buttonContainer}>
        {blogs.length !== totalCount ? (
          <Button
            label="Load More"
            variant={'orange'}
            arrowOptions={'none'}
            onClick={handleClick}
          />
        ) : (
          <div className={styles.buttonContainer}>
            <Button
              label="Search Tags"
              link="/blog/tags"
              variant="transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
