import { Metadata } from 'next';
import BlogList from '../components/BlogList/BlogList';
import HomePageData from '../models/HomePageData';
import sanityClient from '../utils/sanityClient';
import queries from '../constants/queries';

export const metadata: Metadata = {
    title: 'Mitchell Scott',
    description: "Mitchell Scott's Software Engineering Blog",
};

async function getHomePageData(): Promise<HomePageData> {
    const data: HomePageData = await sanityClient.fetch(queries.HomePage);
    return data;
}

export default async function Home() {
    const data = await getHomePageData();
    return (
        <BlogList
            list={data.blogList}
            totalCount={data.totalCount}
        />
    );
}