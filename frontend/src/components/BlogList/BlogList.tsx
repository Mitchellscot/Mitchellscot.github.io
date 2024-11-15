'use client';
import {useState} from 'react';
import BlogPreviewModel from '../../models/BlogPreview';
import BlogPreview from '../BlogPreview/BlogPreview';
import Button from '../Button/Button';
import styles from './BlogList.module.scss';

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
  const [disabled, setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);
    const url = `/api/blogs?lastId=${lastId}&lastPublishDate=${lastPublishDate}`;
    const newBlogs = (await fetch(url, {method: 'GET'}).then((res) =>
      res.json()
    )) as BlogListProps;
    setLastId(newBlogs.list[newBlogs.list.length - 1]?._id);
    setLastPublishDate(newBlogs.list[newBlogs.list.length - 1]?.publishDate);
    setBlogs([...blogs, ...newBlogs.list]);
    setDisabled(false);
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
            disabled={disabled}
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
