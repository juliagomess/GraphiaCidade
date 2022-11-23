import { AxiosError } from 'axios';

interface IApiError {
  url: string | undefined,
  method: string | undefined,
  headers: {},
  data: any,
  response: any,
  status: number | null,
  message: string,
}

export const handleAxiosError = (err: AxiosError) => {
  if (err.response && err.response.status === 400 && err.response.data && err.response.data.error) {
    throw new Error(err.response.data.error);
  }
  if (err.response && err.response.status === 401) {
    throw new Error(err.response.data.error);
  }
  if (err.code && err.code === 'ECONNABORTED') {
    throw new Error('TIMEOUT');
  }
  const error: IApiError = {
    data: err.config && err.config.data,
    headers: err.config && err.config.headers,
    message: err.message,
    method: err.config && err.config.method,
    response: null,
    status: null,
    url: err.config && err.config.url,
  };
  if (err.response) {
    error.response = err.response.data;
    error.status = err.response.status;
  }

  return error;
};
