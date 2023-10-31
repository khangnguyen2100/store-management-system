import useSWR from 'swr';

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

const useProducts = (props: Props) => {
  const { idCh } = props;
  const { data, error, isLoading, mutate } = useSWR(`/api/san-pham/${idCh}`);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProducts;
