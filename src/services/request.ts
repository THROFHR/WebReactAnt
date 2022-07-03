import { request } from '@umijs/max';

export default function <T>(...args: any[]): Promise<T> {
  const options = args[1] || {};

  const headers = {
    ...(options.headers || {}),
  };
  const token = localStorage.getItem('LOGIN_TOKEN');
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }
  return request(args[0], { ...options, headers }).then((res) => {
    if (res.data.token) {
      localStorage.setItem('LOGIN_TOKEN', res.data.token);
    }
    return res.data;
  });
}
