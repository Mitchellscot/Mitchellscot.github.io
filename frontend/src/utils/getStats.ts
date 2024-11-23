import 'server-only';
import {cache} from 'react';
import {NextRequest, NextResponse} from 'next/server';
import {GetExerTrackData} from './ExerTrackClient';
import {ExerTrackResponse} from '../models/ExerTrackResponse';

const getData = cache(GetExerTrackData);

const getStats = async (req: NextRequest) => {
  const result = await getData<ExerTrackResponse>();
  if (!result) {
    return NextResponse.json(result, {status: 500});
  }

  return NextResponse.json(result, {status: 200});
};
export default getStats;
