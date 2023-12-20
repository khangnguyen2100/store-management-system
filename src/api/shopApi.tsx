import useSWR from 'swr';

import { serialize } from 'src/utils/format';

import { request } from './config';
import { ShopProp } from 'src/constants/types/shop';

type Props = {
  idUsers: string;
};

export const shopApi = {
  createShop: (data: any) => {
    return request(`/api/cua-hang`, {
      method: 'POST',
      data,
    });
  },
  deleteShop: (id: string) => {
    return request(`/api/cua-hang/${id}`, {
      method: 'DELETE',
    });
  },
  editShop: () => {},
};

const useShops = (params: Props) => {
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/cua-hang?${serialize(params)}`);

  return {
    data: (data?.data as ShopProp[]) || [],
    error,
    isLoading,
    mutate,
  };
};

export default useShops;
