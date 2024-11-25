'user server';
import {NextRequest} from 'next/server';
import {revalidateTag} from 'next/cache';
import getStats from './getStats';

export default function revalidateDataCache(req: NextRequest) {
  revalidateTag('extertrack');
  return getStats(req);
}
