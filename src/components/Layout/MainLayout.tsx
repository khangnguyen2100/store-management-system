import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.JSX.Element;
};

const MainLayout = (props: Props) => {
  return (
    <div>
      <nav className='flex-center my-6 gap-4'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/protected'>Protected</Link>
      </nav>
      <div>{props.children}</div>
    </div>
  );
};

export default MainLayout;
