import fs from 'fs';
import path from 'path';
import 'server-only';

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
      const staticData =
        require('/Resources/exerTrackResponse.json') as ExerTrackResponse;
      data = staticData;
    }
    const filePath = path.resolve(__dirname, 'exerTrackResponse.json');
    //const filePath = '../Resources/exerTrackResponse.json';
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  } catch (ex) {
    console.log(
      'Mitchell, there was an error fetching the data from the API. Loading the json file instead.'
    );
    console.log(ex);
    const staticData =
      require('/Resources/exerTrackResponse.json') as ExerTrackResponse;
    return staticData;
  }
}
