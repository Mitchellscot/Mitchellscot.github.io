import 'server-only';
import {NextRequest, NextResponse} from 'next/server';
import {GetExerTrackData} from './ExerTrackClient';
import {ExerTrackResponse} from '../models/ExerTrackResponse';

const getStats = async (req: NextRequest) => {
  const result = await GetExerTrackData<ExerTrackResponse>();
  if (!result) {
    return NextResponse.json(result, {status: 500});
  }

  return NextResponse.json(result, {status: 200});
};
export default getStats;
