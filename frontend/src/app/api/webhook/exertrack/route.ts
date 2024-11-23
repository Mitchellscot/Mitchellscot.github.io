import {NextRequest} from 'next/server';
import cacheStats from '../../../../utils/cacheStats';

export const POST = async (req: NextRequest) => cacheStats(req);
