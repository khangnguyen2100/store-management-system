import useSWR from 'swr';
import { Spin } from 'antd';
import { useState, useEffect } from 'react';

import VerticalBarChart from 'src/components/pages/Home/VerticalBarChart';
import SalesResult from 'src/components/pages/Home/SalesResult';
import HoriziontalBarChart from 'src/components/pages/Home/HoriziontalBarChart';
import { useRevenue } from 'src/api/revenueApi';
import { revenueProps } from 'src/constants/types/revenue';
import { getIdCh } from 'src/utils/common';

const Home = () => {
  const {
    data: revenueData,
    isLoading,
    mutate,
  } = useRevenue({ idCh: getIdCh() });
  console.log(revenueData);

  if (revenueData && revenueData.data)
    return (
      <div className='mx-auto flex w-full max-w-7xl flex-col'>
        <SalesResult></SalesResult>
        <VerticalBarChart data={revenueData.data}></VerticalBarChart>
        <HoriziontalBarChart data={revenueData.data}></HoriziontalBarChart>
      </div>
    );
  return <Spin size='large' />;
};

export default Home;
