import { Metadata } from 'next';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import { fetchSanityData } from '../utils/sanityClient';
import queries from '../constants/queries';
import Layout from '../components/Layout/Layout';

export const metadata: Metadata = {
    title: 'Mitchell Scott',
    description: "Mitchell Scott's Software Engineering Blog",
};

async function getHomePageData(): Promise<HomePageData | null> {
    const data = await fetchSanityData<HomePageData>(queries.HomePage);
    return data;
}

export default async function Home() {
    const data = await getHomePageData();

    if (!data)
        return null;
    return (
        <Layout path={'/'}>
            <BlogList
                list={data.blogList}
                totalCount={data.totalCount}
            />
        </Layout>
    );
}