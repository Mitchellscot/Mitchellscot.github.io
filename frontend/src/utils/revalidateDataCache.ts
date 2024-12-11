'use server';
import {NextRequest, NextResponse} from 'next/server';
import {revalidateTag} from 'next/cache';
import {GetExerTrackData} from './ExerTrackClient';
import {ExerTrackResponse} from '../models/ExerTrackResponse';
import path from 'path';
import fs from 'fs';

export default async function revalidateDataCache(req: NextRequest) {
  revalidateTag('extertrack');
  const newStats = await GetExerTrackData<ExerTrackResponse>();
  const filePath = path.resolve('/tmp', 'exerTrackResponse.json');
  fs.writeFileSync(filePath, JSON.stringify(newStats, null, 2), 'utf-8');
  if (!newStats) {
    return NextResponse.json(newStats, {status: 500});
  }

  return NextResponse.json(newStats, {status: 200});
}
