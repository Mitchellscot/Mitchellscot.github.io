import { Metadata } from 'next';
import styles from '../../../styles/pages/Tags.module.scss';
import { Tag, TagsPageData } from '../../../models/TagsPageData';
import Link from 'next/link';
import classNames from 'classnames';
import typography from '../../../styles/typography/Text.module.scss';

import queries from '../../../constants/queries';
import { fetchSanityData } from '../../../utils/sanityClient';

export const metadata: Metadata = {
    title: 'Tags',
    description: "Search This Blog.",
};

async function getTagsPageData(): Promise<TagsPageData | null> {
    const data = await fetchSanityData<TagsPageData>(queries.GetTagsPage);
    return data;
}

export default async function Tags() {
    const tagsPageData = await getTagsPageData();
    if (!tagsPageData)
        return null; //TODO: 404 page
    const tagText = classNames(styles.tag, typography.textLg);
    const instructionText = classNames(styles.instructions, typography.textLg);
    return (
        <>
            <div className={styles.container}>
                <div className={instructionText}>
                    Click on a tag to view all associated posts.
                </div>
                <ul className={styles.tagList}>
                    {tagsPageData.tags.map((tag: Tag, index: number) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={{ pathname: '/blog', query: { tag: tag.tag } }}
                                    legacyBehavior
                                >
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