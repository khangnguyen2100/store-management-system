import VerticalBarChart from 'src/components/pages/Home/VerticalBarChart';
import SalesResult from 'src/components/pages/Home/SalesResult';
import HoriziontalBarChart from 'src/components/pages/Home/HoriziontalBarChart';

const Home = () => {
  const a = process.env.REACT_APP_API_URL;
  console.log(a);
  return (
    <div className='grid w-full grid-cols-12 gap-x-10'>
      <div className='col-span-9 flex flex-col'>
        <SalesResult></SalesResult>
        <VerticalBarChart></VerticalBarChart>
        <HoriziontalBarChart></HoriziontalBarChart>
      </div>
      <div className='col-span-3 h-full shadow-lg'></div>
      
    </div>
  );
};

export default Home;
