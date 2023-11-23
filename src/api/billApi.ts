import { request } from './config';

const billApi = {
  createBill: (data: any) => {
    return request(`/api/hoa-don`, {
      method: 'POST',
      data,
    });
  },
  paymentVNPay: (data: any) => {
    return request(`/api/vnpay_payment`, {
      method: 'POST',
      data,
    });
  },
};

export default billApi;
