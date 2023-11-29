import useSWR from 'swr';

import { serialize } from 'src/utils/format';

import { request } from './config';
type Props = {
  idCh: string;
};
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
export const useBills = (params: Props) => {
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/hoa-don?${serialize(params)}`);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default billApi;
