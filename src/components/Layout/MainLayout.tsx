import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.JSX.Element;
};

const MainLayout = (props: Props) => {
  return (
    <div className='container flex flex-col'>
      <nav className='flex-center my-6 gap-4'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/protected'>Protected</Link>
      </nav>
      <main className='w-full'>{props.children}</main>
    </div>
  );
};

export default MainLayout;
