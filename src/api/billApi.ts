import { request } from './config';

const billApi = {
  createBill: (data: any) => {
    return request(`/api/hoa-don`, {
      method: 'POST',
      data,
    });
  },
};

export default billApi;
