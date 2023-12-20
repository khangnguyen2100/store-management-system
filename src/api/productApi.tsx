import useSWR from 'swr';

import { serialize } from 'src/utils/format';
import { getIdCh } from 'src/utils/common';

import { request } from './config';

type Props = {
  idCh: string;
  keyword?: string;
  tinhTrang?: string;
};

export const productApi = {
  getProducts: () => {
    return request(`/api/san-pham`, {
      method: 'GET',
    });
  },
  getProduct: (id: string) => {
    return request(`/api/san-pham/${id}?idCh=${getIdCh()}`, {
      method: 'GET',
    });
  },
};

const useProducts = (params: Props) => {
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/sort_search?${serialize(params)}`);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProducts;
