import {PortableText} from '@portabletext/react';
import classNames from 'classnames';
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import Image from 'next/legacy/image';
import Link from 'next/link';
import Button from '../../components/Button/Button';
import components from '../../components/PortableText/PortableText';
import BlogEntryModel from '../../models/BlogEntryData';
import styles from '../../styles/pages/BlogEntry.module.scss';
import headers from '../../styles/typography/Heading.module.scss';
import typography from '../../styles/typography/Text.module.scss';
import {blogEntryPaths} from '../../utils/blogEntryPaths';
import pageTitle from '../../utils/pageTitle';
import {getBlogEntry} from '../../utils/static-props';

const BlogEntry = (
  blogEntryData: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const titleText = classNames(styles.title, headers.blogPreview);
  const text = classNames(styles.text, typography.textMd);
  const dateText = classNames(styles.date, typography.textMd);
  const date = new Date(blogEntryData.publishDate);
  const tagText = classNames(styles.tag, typography.textMd);
  return (
    <>
      <NextSeo
        title={pageTitle(blogEntryData.pageTitle)}
        description={blogEntryData.metaDescription}
      />
      <div className={styles.container}>
        <div className={styles.dateTitleContainer}>
          <div className={titleText}>{blogEntryData.title}</div>
          <div className={dateText}>
            {date.toLocaleDateString(`en-us`, {dateStyle: 'medium'})}
          </div>
        </div>
        <div className={styles.titleUnderline}></div>
        <div className={styles.tagList}>
          {blogEntryData.tags &&
            blogEntryData.tags.map((tag: string, index: number) => {
              return (
                <Link
                  href={{pathname: '/blog', query: {tag: tag}}}
                  key={index}
                  legacyBehavior
                >
                  <a className={tagText}>{tag}</a>
                </Link>
              );
            })}
        </div>
        {blogEntryData.image.url && (
          <div className={styles.imageContainer}>
            <Image
              src={blogEntryData.image.url}
              height={blogEntryData.image.height}
              width={blogEntryData.image.width}
              alt={blogEntryData.image.alt}
            />
          </div>
        )}
        <div className={text}>
          <PortableText
            value={blogEntryData.text}
            onMissingComponent={false}
            components={components}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button label="Search Posts" link="/blog/tags" variant="blue" />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogEntryModel> = async (context) =>
  getBlogEntry(context);
export const getStaticPaths: GetStaticPaths = async () => blogEntryPaths();
export default BlogEntry;
