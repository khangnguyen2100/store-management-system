import { Outlet } from 'react-router-dom';

import AdminHeader from 'src/components/Header/Header';

const MainLayout = () => {
  return (
    <div className='flex flex-col'>
      <AdminHeader></AdminHeader>
      <main className='container my-4 w-full'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
