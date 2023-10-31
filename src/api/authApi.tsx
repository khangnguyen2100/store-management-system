import axios from 'axios';

import { request } from './config';

const authApi = {
  login: (data: any) => {
    return request(`/authentication/api/v1/login`, {
      method: 'POST',
      data,
    });
  },
  checkToken: () => {
    return request('/auth/check-token', {
      method: 'GET',
    });
  },
  refresh: async () => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/authentication/api/v1/refreshtoken`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
  },
  logout: () => {
    return request('/auth/logout', {
      method: 'GET',
    });
  },
};

export default authApi;
