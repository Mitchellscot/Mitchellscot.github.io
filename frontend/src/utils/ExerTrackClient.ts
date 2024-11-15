import {APIResponse} from '../models/API';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import http from './http';
import {AxiosRequestConfig} from 'axios';

const baseUrl = process.env.EXERTRACK_BASE_URL;
const token = process.env.EXERTRACK_API_TOKEN;

export async function GetExerTrackData<ExerTrackResponse>(): Promise<
  APIResponse<ExerTrackResponse, HttpErrorResponseModel>
> {
  const url = `${baseUrl}${'/activities'}`;

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await http.get<ExerTrackResponse, HttpErrorResponseModel>(
    url,
    undefined,
    config
  );
  console.log(JSON.stringify(response.data));
  return response;
}
