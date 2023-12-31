import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Select, Spin } from 'antd';
import { useState, useEffect } from 'react';

import { formatPrice } from 'src/utils/format';
import { revenueProps } from 'src/constants/types/revenue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  LineElement,
  PointElement,
);
type Props = {
  data: revenueProps[];
};
const options = {
  responsive: true,
  // indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: true,
      position: 'right' as const,
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
    .map(item => parseInt(item.loiNhuan));

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
      revenueMonthly[thang] += parseInt(item.loiNhuan);
    } else {
      // Nếu chưa tồn tại, tạo mới và gán giá trị doanh thu
      revenueMonthly[thang] = parseInt(item.loiNhuan);
    }
  });

  // Chuyển đổi đối tượng thành mảng
  const result = Object.keys(revenueMonthly).map(thang => ({
    thang: thang,
    loiNhuan: revenueMonthly[thang],
  }));

  return result;
}
function HoriziontalBarChart({ data }: Props) {
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
      return parseInt(item.loiNhuan);
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
        return revenueMonthly.map(item => item.loiNhuan);
      });
      setLabels(() => {
        return revenueMonthly.map(item => item.thang);
      });
    }
    if (type === 'Theo quý') {
      const revenueMonthly = getRevenueQuarterly(data);
      setChartData(() => {
        return revenueMonthly.map(item => item.loiNhuan);
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
        borderColor: '#0090DA',
        yAxisID: 'y',
      },
    ],
  };
  if (data)
    return (
      <div className='mt-5 flex flex-col gap-y-7 p-7 shadow-lg'>
        <div className='flex justify-between'>
          <h3>
            Lợi nhuận tháng này :{' '}
            <span className='text-blue-500'>
              {data.length > 0 && formatPrice(getCurrentMonthRevenue(data))}
            </span>
          </h3>
          <Select
            placeholder={'Chọn kiểu hiện'}
            className='w-[150px]'
            onSelect={value => {
              handleChangeType(value);
            }}
          >
            <Select.Option value='Theo ngày'>Theo ngày</Select.Option>
            <Select.Option value='Theo tháng'>Theo tháng</Select.Option>
            <Select.Option value='Theo quý'>Theo quý</Select.Option>
          </Select>
        </div>
        <Line options={options} data={test} redraw={true} updateMode='reset' />
      </div>
    );
  return <Spin size='small'></Spin>;
}
function getRevenueQuarterly(data: any[]) {
  const revenueQuarterly: any = {};

  data.forEach(item => {
    // Lấy quý từ ngày tạo
    const quy = Math.floor((new Date(item.ngayTao).getMonth() + 3) / 3);

    // Kiểm tra xem quý đã tồn tại trong mảng chưa
    if (revenueQuarterly[quy]) {
      // Nếu đã tồn tại, cộng thêm doanh thu vào
      revenueQuarterly[quy] += parseInt(item.loiNhuan);
    } else {
      // Nếu chưa tồn tại, tạo mới và gán giá trị doanh thu
      revenueQuarterly[quy] = parseInt(item.loiNhuan);
    }
  });

  // Chuyển đổi đối tượng thành mảng
  const result = Object.keys(revenueQuarterly).map(quy => ({
    quy: quy,
    loiNhuan: revenueQuarterly[quy],
  }));

  return result;
}
export default HoriziontalBarChart;
