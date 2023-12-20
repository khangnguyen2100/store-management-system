import { Spin } from 'antd';

import { useRevenue } from 'src/api/revenueApi';
import HoriziontalBarChart from 'src/components/pages/Home/HoriziontalBarChart';
import VerticalBarChart from 'src/components/pages/Home/VerticalBarChart';
import { getIdCh } from 'src/utils/common';

const Home = () => {
  const {
    data: revenueData,
    isLoading,
    mutate,
  } = useRevenue({ idCh: getIdCh() });

  if (!isLoading)
    return (
      <div className='mx-auto flex w-full max-w-7xl flex-col'>
        {/* <SalesResult></SalesResult> */}
        <VerticalBarChart data={revenueData.data}></VerticalBarChart>
        <HoriziontalBarChart data={revenueData.data}></HoriziontalBarChart>
      </div>
    );
  return <Spin size='large' />;
};

export default Home;
