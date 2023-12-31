import useSWR from 'swr';

import { serialize } from 'src/utils/format';

import { request } from './config';

type Props = {
  idCh: string;
  keyword?: string;
  tinhTrang?: string;
};

const productApi = {
  getProducts: () => {
    return request(`/api-san-pham`, {
      method: 'GET',
    });
  },
  postProducts: () => {},
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
