import {PortableText} from '@portabletext/react';
import classNames from 'classnames';
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import Image from 'next/image';
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
  return (
    <>
      <NextSeo
        title={pageTitle(blogEntryData.pageTitle)}
        description={blogEntryData.metaDescription}
      />
      <div className={styles.container}>
        <div className={titleText}>{blogEntryData.title}</div>
        <div className={styles.titleUnderline}></div>
        <div className={dateText}>
          {date.toLocaleDateString(`en-us`, {dateStyle: 'medium'})}
        </div>
        {blogEntryData.image && (
          <div className={styles.imageContainer}>
            {/* add image builder here or something */}
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
      </div>
    </>
  );
};

export default BlogEntry;

export const getStaticProps: GetStaticProps<BlogEntryModel> = async (context) =>
  getBlogEntry(context);

export const getStaticPaths: GetStaticPaths = async () => blogEntryPaths();
