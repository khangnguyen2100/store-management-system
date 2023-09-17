import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';

type Props = {
  children: React.JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, checkLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  checkLoggedIn();
  useEffect(() => {
    if (!checkLoggedIn()) {
      navigate('/dang-nhap', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};
export default ProtectedRoute;
