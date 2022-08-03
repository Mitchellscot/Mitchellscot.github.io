import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {APIResponse} from '../../models/API';
import {createResponseError} from './httpResponseUtil';

export const request = async <T>(
  restRequest: Partial<Request>,
  config?: AxiosRequestConfig
) => {
  const axiosRequestConfig: AxiosRequestConfig = {
    ...config,
    method: restRequest.method as Method,
    url: restRequest.url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...config!.headers,
    },
  };
  const axiosResponse: AxiosResponse<T> = await axios(axiosRequestConfig);

  return axiosResponse.data;
};

export const handleRequest = async <T, E>(
  restRequest: Partial<Request>,
  config?: AxiosRequestConfig
): Promise<APIResponse<T, E>> => {
  try {
    const data = await request<T>(restRequest, config);

    return {data};
  } catch (error) {
    return {error: createResponseError(error, restRequest)};
  }
};
