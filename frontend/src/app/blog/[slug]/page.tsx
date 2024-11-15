import {PortableText} from '@portabletext/react';
import classNames from 'classnames';
import {Metadata, ResolvingMetadata} from 'next';
import Image from 'next/legacy/image';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import components from '../../../components/PortableText/PortableText';
import styles from '../../../styles/pages/BlogEntry.module.scss';
import headers from '../../../styles/typography/Heading.module.scss';
import typography from '../../../styles/typography/Text.module.scss';
import {fetchSanityData, getCachedClient} from '../../../utils/sanityClient';
import {
  generateBlogEntryQuery,
  getBlogMetadata,
} from '../../../constants/queryHelpers';
import BlogEntryData from '../../../models/BlogEntryData';
import queries from '../../../constants/queries';
import getMetadata from '../../../utils/getBlogMetaData';

type BlogProps = {
  params: Promise<{slug: string}>;
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
};

export async function generateMetadata(
  {params, searchParams}: BlogProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = await params.then((p) => p.slug);
  console.log('mitchell slug', slug);
  return getMetadata(slug);
}

export async function generateStaticParams() {
  const posts = await getCachedClient(false)<string[]>(queries.GetAllBlogSlugs);

  return posts.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogEntry({params}: BlogProps) {
  const slug = (await params).slug;
  const data = await fetchSanityData<BlogEntryData>(
    generateBlogEntryQuery(slug)
  );

  if (!data) return null; //TODO: 404 page

  const titleText = classNames(styles.title, headers.blogPreview);
  const text = classNames(styles.text, typography.textMd);
  const dateText = classNames(styles.date, typography.textMd);
  const date = new Date(data.publishDate);
  const tagText = classNames(styles.tag, typography.textMd);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.dateTitleContainer}>
          <div className={titleText}>{data.title}</div>
          <div className={dateText}>
            {date.toLocaleDateString(`en-us`, {dateStyle: 'medium'})}
          </div>
        </div>
        <div className={styles.titleUnderline}></div>
        <div className={styles.tagList}>
          {data.tags &&
            data.tags.map((tag: string, index: number) => {
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
        {data.image.url && (
          <div className={styles.imageContainer}>
            <Image
              src={data.image.url}
              height={data.image.height}
              width={data.image.width}
              alt={data.image.alt}
            />
          </div>
        )}
        <div className={text}>
          <PortableText
            value={data.text}
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
}
