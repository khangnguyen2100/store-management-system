import useSWR from 'swr';

import { serialize } from 'src/utils/format';

import { request } from './config';

type Props = {
  idCh: string;
};

const productApi = {
  getProducts: () => {
    return request(`/api-san-pham`, {
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
  } = useSWR(`/api/san-pham?${serialize(params)}`);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProducts;
