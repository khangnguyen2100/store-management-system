import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Doanh thu tháng này',
      align: 'start' as const,
    },
  },
};
export const labels = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];
const abc = labels.map(() => faker.datatype.number({ min: 0, max: 1000 }));
console.log(abc);

export const data = {
  labels,
  datasets: [
    {
      label: 'Đơn vị *1000 VNĐ',
      data: abc,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
function VerticalBarChart() {
  return (
    <div className='mt-5 shadow-lg'>
      <Bar options={options} data={data} />
    </div>
  );
}

export default VerticalBarChart;
