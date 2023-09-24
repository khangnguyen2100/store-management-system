import React from 'react';

import AdminHeader from 'src/components/Header/Header';

type Props = {
  children: React.JSX.Element;
};

const MainLayout = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <AdminHeader></AdminHeader>
      <main className='container my-4 w-full'>{props.children}</main>
    </div>
  );
};

export default MainLayout;
