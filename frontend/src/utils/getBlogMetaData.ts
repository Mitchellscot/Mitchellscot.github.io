import type { Metadata } from 'next';
import { getBlogMetadata } from '../constants/queryHelpers';
import { fetchSanityData } from './sanityClient';

interface BlogMetadata {
    title: string;
    metaDescription: string;
}

export default async function getMetadata(slug: string): Promise<Metadata> {
    const data = await fetchSanityData<BlogMetadata>(getBlogMetadata(slug));
    console.log('mitchell, data', data)
    return {
        description: data?.metaDescription,
        title: data?.title
    };

}
