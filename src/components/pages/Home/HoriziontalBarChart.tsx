import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);
import { data } from './VerticalBarChart';
const options = {
  responsive: true,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Doanh thu tháng này',
      align: 'start' as const,
    },
  },
};
function HoriziontalBarChart() {
  return (
    <div className='mt-5 shadow-lg'>
      <Bar options={options} data={data} />
    </div>
  );
}

export default HoriziontalBarChart;
