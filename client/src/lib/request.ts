import Axios from 'axios';

export const post = async (url: string, data?: { [index: string]: any }) =>
  Axios({
    method: 'post',
    url,
    baseURL: '/api',
    data,
  });

export const get = async (url: string) =>
  Axios({
    method: 'get',
    url,
    baseURL: '/api',
  });
