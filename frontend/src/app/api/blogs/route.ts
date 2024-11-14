import { NextRequest } from 'next/server';
import getBlogs from '../../../utils/getBlogs';

export const GET = async (req: NextRequest) => getBlogs(req);

