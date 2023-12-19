import { Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { useBills } from 'src/api/billApi';
import Filters, { FilterProps } from 'src/components/Filters/Filters';
import BillList from 'src/components/pages/Bills/BillList';
import { BillProps } from 'src/constants/types/bill';
import { getIdCh } from 'src/utils/common';

const filters: FilterProps[] = [
  { name: 'date', title: 'Tất cả', type: 'pick-time' },
];
type Filters = {
  date: string;
  startDate: string;
  endDate: string;
};
function Bills() {
  const { data: billData, isLoading } = useBills({ idCh: getIdCh() });
  const [filterData, setFilterData] = useState<Filters>();
  const [bills, setBills] = useState<BillProps[]>([]);
  console.log('bills:', bills);
  const handleFilterChange = (filters: any) => {
    let startDate = '';
    let endDate = '';
    const { date } = filters;
    // bill created_at is 20-12-2021
    if (date === 'today') {
      const currentDate = dayjs().format('DD/MM/YYYY');
      startDate = dayjs().format('YYYY-MM-DD');
      endDate = dayjs().format('YYYY-MM-DD');
      setBills(
        billData?.data.filter(
          (bill: BillProps) => bill.created_at === currentDate,
        ),
      );
    } else if (date === 'tomorrow') {
      const tomorrowDate = dayjs().subtract(1, 'day').format('DD/MM/YYYY');
      startDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      setBills(
        billData?.data.filter(
          (bill: BillProps) => bill.created_at === tomorrowDate,
        ),
      );
    } else if (date === '3-days') {
      const sevenDaysAgo = dayjs().subtract(3, 'day').format('DD/MM/YYYY');
      startDate = dayjs().subtract(3, 'day').format('YYYY-MM-DD');
      endDate = dayjs().format('YYYY-MM-DD');
      setBills(
        billData?.data.filter(
          (bill: BillProps) => bill.created_at! >= sevenDaysAgo,
        ),
      );
    } else if (date === '7-days') {
      const sevenDaysAgo = dayjs().subtract(7, 'day').format('DD/MM/YYYY');
      startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
      endDate = dayjs().format('YYYY-MM-DD');
      setBills(
        billData?.data.filter(
          (bill: BillProps) => bill.created_at! >= sevenDaysAgo,
        ),
      );
    } else if (date === '30-days') {
      const sevenDaysAgo = dayjs().subtract(30, 'day').format('DD/MM/YYYY');
      startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
      endDate = dayjs().format('YYYY-MM-DD');
      setBills(
        billData?.data.filter(
          (bill: BillProps) => bill.created_at! >= sevenDaysAgo,
        ),
      );
    } else {
      if (!date?.startDate || !date?.endDate) return;
      // custom date
      const startDateFilter = dayjs(date?.startDate).format('DD/MM/YYYY');
      const endDateFilter = dayjs(date?.endDate).format('DD/MM/YYYY');
      startDate = date?.startDate;
      endDate = date?.endDate;
      setBills(
        billData?.data.filter(
          (bill: BillProps) =>
            bill.created_at! >= startDateFilter &&
            bill.created_at! <= endDateFilter,
        ),
      );
    }
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    setFilterData({
      date,
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    if (billData?.data) {
      setBills(billData.data);
    }
  }, [billData?.data]);

  if (isLoading) {
    return <Spin size='large' />;
  }
  return (
    <div className='flex w-full items-start gap-5'>
      <Filters
        title='Hóa đơn'
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <BillList data={bills} filters={filterData} />
    </div>
  );
}

export default Bills;
