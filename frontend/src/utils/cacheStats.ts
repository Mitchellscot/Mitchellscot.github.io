import 'server-only';
import {cache} from 'react';
import {NextRequest, NextResponse} from 'next/server';
import {GetExerTrackData} from './ExerTrackClient';
import {ExerTrackResponse} from '../models/ExerTrackResponse';

const getData = cache(GetExerTrackData);

const cacheStats = async (req: NextRequest) => {
  console.log('Hello Mitchell');
  const result = await getData<ExerTrackResponse>();
  if (!result) {
    return NextResponse.json(result, {status: 500});
  }

  return NextResponse.json({status: 200});
};
export default cacheStats;
