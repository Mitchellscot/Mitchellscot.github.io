import 'server-only';

const baseUrl = process.env.EXERTRACK_BASE_URL;
const token = process.env.EXERTRACK_API_TOKEN;

export async function GetExerTrackData<
  ExerTrackResponse,
>(): Promise<ExerTrackResponse | null> {
  const url = `${baseUrl}${'/api/activities'}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'force-cache',
  });
  let data = await response?.json();

  if (!response.ok || !data) {
    console.log(
      'Mitchell, we are getting a null response from the ExerTrack API. Loading the json file instead.'
    );
    //read the contents of /Resources/exerTrackResponse.json
    const staticData =
      require('/Resources/exerTrackResponse.json') as ExerTrackResponse;
    data = staticData;
  }
  return data;
}
