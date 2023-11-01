import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className='flex-center h-[50vh] w-full'>
      <Spin />
    </div>
  );
};

export default Loading;
