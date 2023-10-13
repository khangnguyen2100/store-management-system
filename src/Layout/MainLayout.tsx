import React from 'react';

import AdminHeader from 'src/components/Header/Header';

type Props = {
  children: React.JSX.Element;
};

const MainLayout = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <AdminHeader></AdminHeader>
      <main className='w-large container my-4 px-10'>{props.children}</main>
    </div>
  );
};

export default MainLayout;
