import {AxiosRequestConfig} from 'axios';
import {handleRequest} from './http/httpRequestUtil';

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

const get = async <T, P = unknown, E = null>(
  endpoint: string,
  params?: P,
  requestConfig?: AxiosRequestConfig
) => {
  const paramsConfig: AxiosRequestConfig | undefined = params
    ? {params}
    : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethod.Get,
    },
    {
      ...paramsConfig,
      ...requestConfig,
    }
  );
};

const post = async <T, E = null>(
  endpoint: string,
  data?: unknown,
  requestConfig?: AxiosRequestConfig
) => {
  const config: AxiosRequestConfig | undefined = data ? {data} : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethod.Post,
    },
    {
      ...config,
      ...requestConfig,
    }
  );
};

const put = async <T, E = null>(endpoint: string, data?: unknown) => {
  const config: AxiosRequestConfig | undefined = data ? {data} : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethod.Put,
    },
    config
  );
};

const deleteRequest = async <T, E = null>(endpoint: string) => {
  return handleRequest<T, E>({
    url: endpoint,
    method: RequestMethod.Delete,
  });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  put,
  delete: deleteRequest,
};
