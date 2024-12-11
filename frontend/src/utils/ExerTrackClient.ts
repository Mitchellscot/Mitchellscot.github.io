'use server';
import fs from 'fs';
import {revalidateTag} from 'next/cache';
import path from 'path';

const baseUrl = process.env.EXERTRACK_BASE_URL;
const token = process.env.EXERTRACK_API_TOKEN;

export async function GetExerTrackData<
  ExerTrackResponse,
>(): Promise<ExerTrackResponse | null> {
  const url = `${baseUrl}${'/api/activities'}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'force-cache',
      next: {
        tags: ['extertrack'],
      },
    });
    let data = await response?.json();
    const recentActivities = data.recentActivities;

    if (!response.ok || !data || recentActivities.length === 0) {
      console.log(
        'Mitchell, we are getting a null response from the ExerTrack API. Loading the json file instead.'
      );
      revalidateTag('extertrack');
      const tmpFilePath = path.resolve('/tmp', 'exerTrackResponse.json');
      if (fs.existsSync(tmpFilePath)) {
        const data = JSON.parse(fs.readFileSync(tmpFilePath, 'utf-8'));
        return data;
      } else {
        const staticData =
          require('/Resources/exerTrackResponse.json') as ExerTrackResponse;
        return staticData;
      }
    }
    return data;
  } catch (ex) {
    console.log(
      'Mitchell, there was an error fetching the data from the API. Loading the json file instead.'
    );
    console.log(ex);
    if (fs.existsSync('/tmp/exerTrackResponse.json')) {
      const data = JSON.parse(
        fs.readFileSync('/tmp/exerTrackResponse.json', 'utf-8')
      );
      return data;
    } else {
      const staticData =
        require('/Resources/exerTrackResponse.json') as ExerTrackResponse;
      return staticData;
    }
  }
}
