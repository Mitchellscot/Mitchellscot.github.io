import {NextRequest} from 'next/server';
import getStats from '../../../utils/getStats';

export const GET = async (req: NextRequest) => getStats(req);
