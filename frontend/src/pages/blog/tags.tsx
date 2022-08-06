import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import pageTitle from '../../utils/pageTitle';
import {getAllBlogTags} from '../../utils/static-props';
import styles from '../../styles/pages/Tags.module.scss';
import {TagsPageData} from '../../models/TagsPageData';
import Link from 'next/link';
import classNames from 'classnames';
import text from '../../styles/typography/Text.module.scss';

export default function Tags(
  tagsPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  const tagText = classNames(styles.tag, text.textMd);
  return (
    <>
      <NextSeo title={pageTitle('Tags')} description={'Search This Blog.'} />
      <div className={styles.container}>
        {tagsPageData.tags.map((tag: string, index: number) => {
          return (
            <Link href={{pathname: '/blog', query: {tag: tag}}} key={index}>
              <a className={tagText}>{tag}</a>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<TagsPageData> = async (context) =>
  getAllBlogTags(context);
