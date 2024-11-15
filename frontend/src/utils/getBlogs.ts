import {NextRequest, NextResponse} from 'next/server';
import {fetchSanityData} from './sanityClient';
import {getMoreBlogs} from '../constants/queryHelpers';
import BlogPreview from '../models/BlogPreview';

const getBlogs = async (req: NextRequest) => {
  const lastId = req.nextUrl.searchParams.get('lastId');
  const lastPublishDate = req.nextUrl.searchParams.get('lastPublishDate');

  if (lastId === null || lastPublishDate === null) {
    return NextResponse.json(
      {error: 'lastId and lastPublishDate are required'},
      {status: 500}
    );
  }
  const result = await fetchSanityData<BlogPreview[]>(
    getMoreBlogs(lastPublishDate, lastId)
  );

  return NextResponse.json(result, {status: 200});
};
export default getBlogs;
