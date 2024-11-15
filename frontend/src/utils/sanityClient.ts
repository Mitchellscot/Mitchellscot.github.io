import {type SanityClient} from 'next-sanity';
import {createClient} from 'next-sanity';
import {draftMode} from 'next/headers';
import {cache} from 'react';

type FetchQueryParams = Record<string, string>;

export async function fetchSanityData<T>(
  query: string,
  params?: FetchQueryParams
): Promise<T | null> {
  try {
    const isPreview = (await draftMode()).isEnabled; //use this another time. Cookie based draft mode.
    const result = await getCachedClient(false)<T>(query, params ? params : {});
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getCachedClient = (isPreview: boolean) => {
  const client = getClient(isPreview);

  return cache(client.fetch.bind(client));
};

export function getClient(preview: boolean = false): SanityClient {
  const token = process.env.SANITY_READ_TOKEN;
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2024-08-28',
    token: token,
    ignoreBrowserTokenWarning: true,
    useCdn: false,
    perspective: preview ? 'previewDrafts' : 'published',
  });
}
