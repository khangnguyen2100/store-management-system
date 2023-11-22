import useSWR from 'swr';

import { serialize } from 'src/utils/format';

type Props = {
  idCh: string;
};

export const useRevenue = (params: Props) => {
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/doanh-thu?${serialize(params)}`);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
