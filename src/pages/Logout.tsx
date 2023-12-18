import { useContext, useEffect } from 'react';

import AuthContext from 'src/routes/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, []);
  return <></>;
};

export default Logout;
