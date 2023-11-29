import { Spin } from 'antd';

import { useBills } from 'src/api/billApi';
import BillList from 'src/components/pages/Bills/BillList';

function Bills() {
  const { data: billData, mutate } = useBills({ idCh: '4' });

  if (billData && billData?.data)
    return (
      <div className='flex w-full items-start gap-5'>
        {/* <MyFilters
          title='Hàng hóa'
          filters={filters}
          onFilterChange={handleFilterChange}
        /> */}
        <BillList data={billData.data} mutate={mutate} />
      </div>
    );

  return <Spin size='large' />;
}

export default Bills;