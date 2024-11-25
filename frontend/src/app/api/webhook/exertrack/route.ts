import {NextRequest} from 'next/server';
import revalidateDataCache from '../../../../utils/revalidateDataCache';

export const POST = async (req: NextRequest) => revalidateDataCache;
