import {APIResponse} from '../models/API';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import http from './http';
import {AxiosRequestConfig} from 'axios';

const baseUrl = process.env.EXERTRACK_BASE_URL;
const token = process.env.EXERTRACK_API_TOKEN;

export async function GetExerTrackData<
  ExerTrackResponse,
>(): Promise<ExerTrackResponse | null> {
  const url = `${baseUrl}${'/api/activities'}`;

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await http.get<ExerTrackResponse, null>(
    url,
    undefined,
    config
  );
  let data = response?.data;
  if (response.error || !data) {
    //read the contents of /Resources/exerTrackResponse.json
    const staticData =
      require('/Resources/exerTrackResponse.json') as ExerTrackResponse;
    data = staticData;
  }

  return data;
}
