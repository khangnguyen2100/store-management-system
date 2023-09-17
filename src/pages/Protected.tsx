import { Button } from 'antd';
import React, { useContext } from 'react';

import AuthContext from 'src/routes/AuthContext';

const Protected = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className=''>
      Protected page
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Protected;
