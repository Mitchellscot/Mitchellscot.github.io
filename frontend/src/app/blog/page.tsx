import { NextRequest } from 'next/server';
import BlogList from '../../components/BlogList/BlogList';
import queries from '../../constants/queries';
import { getBlogPreviewsByTag } from '../../constants/queryHelpers';
import HomePageData from '../../models/HomePageData';
import sanityClient from '../../utils/sanityClient';
import { PageParams, SlugParam } from '../../models/NextTypes';

//Next does not allow running query parameters on the home URL
//SO I had to make a seperate page /blog so that the url parameters work properly
//it's basically a copy of the home page, but you can run queries on it.
//Also, I didn't want the homepage to redirect to /blog - I wanted a clean looking URL - mitchellscott.me

async function getHomePageData(): Promise<HomePageData> {
    const data: HomePageData = await sanityClient.fetch(queries.HomePage);
    return data;
}
const getTaggedBlogPreviews = async (queryString: string | string[]): Promise<HomePageData> => {
    const queryValue = typeof queryString === 'string' ? queryString : queryString[0];
    const acceptableTags = await sanityClient.fetch<Array<string>>(
        queries.GetAllTags
    );

    //if query parameter isn't valid, just return the default page
    if (acceptableTags.indexOf(queryValue) === -1) {
        return getHomePageData();
    }

    const data = await sanityClient.fetch<HomePageData>(
        getBlogPreviewsByTag(queryValue)
    );
    return data;
};

type PageProps = PageParams<SlugParam, { tag?: string; }>;

export default async function Blog({ searchParams }: PageProps) {
    const { tag } = await searchParams;
    let data;
    if (tag)
        data = await getTaggedBlogPreviews(tag);
    else
        data = await getHomePageData();
    return (
        <>
            <BlogList
                list={data.blogList}
                totalCount={data.totalCount}
            />
        </>
    );
}
