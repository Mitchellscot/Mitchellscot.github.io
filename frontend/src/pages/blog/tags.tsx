import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import pageTitle from '../../utils/pageTitle';
import {getAllBlogTags} from '../../utils/static-props';
import styles from '../../styles/pages/Tags.module.scss';
import {Tag, TagsPageData} from '../../models/TagsPageData';
import Link from 'next/link';
import classNames from 'classnames';
import typography from '../../styles/typography/Text.module.scss';

export default function Tags(
  tagsPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  const tagText = classNames(styles.tag, typography.textLg);
  const instructionText = classNames(styles.instructions, typography.textLg);
  return (
    <>
      <NextSeo title={pageTitle('Tags')} description={'Search This Blog.'} />
      <div className={styles.container}>
        <div className={instructionText}>
          Click on a tag to view all blog posts associated with it.
        </div>
        <ul className={styles.tagList}>
          {tagsPageData.tags.map((tag: Tag, index: number) => {
            return (
              <li key={index}>
                <Link href={{pathname: '/blog', query: {tag: tag.tag}}}>
                  <a className={tagText}>
                    {tag.tag}{' '}
                    <span className={styles.tagCount}>({tag.count})</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<TagsPageData> = async (context) =>
  getAllBlogTags(context);
