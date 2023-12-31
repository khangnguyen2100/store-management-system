import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Select, Spin } from 'antd';
import { useState, useEffect, useRef } from 'react';

import { formatPrice } from 'src/utils/format';
import { revenueProps } from 'src/constants/types/revenue';
import PickTimeFilter from 'src/components/Filters/PickTimeFilter/PickTimeFilter';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);
type Props = {
  data: revenueProps[];
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
    },
  },
};
const getCurrentMonthRevenue = (data: revenueProps[]) => {
  const date = new Date();
  const currentMonth = (date.getMonth() + 1).toString();

  const revenueMonthArray = (data ?? [])
    .filter(item => {
      const monthOfRevenue = item.ngayTao.split(' ')[0].split('-')[1];
      return monthOfRevenue === currentMonth;
    })
    .map(item => parseInt(item.doanhThu));

  return revenueMonthArray.reduce((previous, current) => previous + current, 0);
};
function getRevenueMonthly(data: any[]) {
  const revenueMonthly: any = {};

  data.forEach(item => {
    // Lấy tháng từ ngày tạo
    const thang = new Date(item.ngayTao).getMonth() + 1;

    // Kiểm tra xem tháng đã tồn tại trong mảng chưa
    if (revenueMonthly[thang]) {
      // Nếu đã tồn tại, cộng thêm doanh thu vào
      revenueMonthly[thang] += parseInt(item.doanhThu);
    } else {
      // Nếu chưa tồn tại, tạo mới và gán giá trị doanh thu
      revenueMonthly[thang] = parseInt(item.doanhThu);
    }
  });

  // Chuyển đổi đối tượng thành mảng
  const result = Object.keys(revenueMonthly).map(thang => ({
    thang: thang,
    doanhThu: revenueMonthly[thang],
  }));

  return result;
}
function getRevenueQuarterly(data: any[]) {
  const revenueQuarterly: any = {};

  data.forEach(item => {
    // Lấy quý từ ngày tạo
    const quy = Math.floor((new Date(item.ngayTao).getMonth() + 3) / 3);

    // Kiểm tra xem quý đã tồn tại trong mảng chưa
    if (revenueQuarterly[quy]) {
      // Nếu đã tồn tại, cộng thêm doanh thu vào
      revenueQuarterly[quy] += parseInt(item.doanhThu);
    } else {
      // Nếu chưa tồn tại, tạo mới và gán giá trị doanh thu
      revenueQuarterly[quy] = parseInt(item.doanhThu);
    }
  });

  // Chuyển đổi đối tượng thành mảng
  const result = Object.keys(revenueQuarterly).map(quy => ({
    quy: quy,
    doanhThu: revenueQuarterly[quy],
  }));

  return result;
}

function VerticalBarChart({ data }: Props) {
  const [labels, setLabels] = useState<string[]>(() => {
    return data.map((item, index) => {
      return item.ngayTao
        .split(' ')[0]
        .split('-')
        .reverse()
        .slice(0, 2)
        .join('-');
    });
  });
  const [chartData, setChartData] = useState<number[]>(() => {
    return data.map((item, index) => {
      if (index > labels.length) return 0;
      return parseInt(item.doanhThu);
    });
  });
  const handleChangeType = (type: string) => {
    if (type === 'Theo ngày') {
      setChartData(() => {
        return data.map(item => parseInt(item.doanhThu));
      });
      setLabels(() => {
        return data.map((item, index) => {
          return item.ngayTao
            .split(' ')[0]
            .split('-')
            .reverse()
            .slice(0, 2)
            .join('-');
        });
      });
    }

    if (type === 'Theo tháng') {
      const revenueMonthly = getRevenueMonthly(data);
      setChartData(() => {
        return revenueMonthly.map(item => item.doanhThu);
      });
      setLabels(() => {
        return revenueMonthly.map(item => item.thang);
      });
    }
    if (type === 'Theo quý') {
      const revenueMonthly = getRevenueQuarterly(data);
      setChartData(() => {
        return revenueMonthly.map(item => item.doanhThu);
      });
      setLabels(() => {
        return revenueMonthly.map(item => item.quy);
      });
    }
  };
  const test = {
    labels,
    datasets: [
      {
        label: 'Đơn vị *1000 VNĐ',
        data: chartData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  if (data)
    return (
      <div className='mt-5 flex flex-col gap-y-7  p-7 shadow-lg'>
        <div className='flex justify-between'>
          <div className='flex gap-x-5'>
            <h3>
              Doanh thu tháng này :{' '}
              <span className='text-blue-500'>
                {data.length > 0 && formatPrice(getCurrentMonthRevenue(data))}
              </span>
            </h3>
          </div>
          <Select
            className='w-[150px]'
            placeholder={'Chọn kiểu hiện'}
            onSelect={value => {
              handleChangeType(value);
            }}
          >
            <Select.Option value='Theo ngày'>Theo ngày</Select.Option>
            <Select.Option value='Theo tháng'>Theo tháng</Select.Option>
            <Select.Option value='Theo quý'>Theo quý</Select.Option>
          </Select>
        </div>
        <Bar options={options} data={test} redraw={true} updateMode='reset' />
      </div>
    );
  return <Spin size='small'></Spin>;
}

export default VerticalBarChart;
