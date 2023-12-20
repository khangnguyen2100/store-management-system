/* eslint-disable @typescript-eslint/no-empty-function */
import { message } from 'antd';
import React, { createContext, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { fireBaseAuth } from 'src/configs/firebase';

import { LOGIN } from './routes.public';

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  checkLoggedIn: () => boolean;
}
type Props = {
  children: React.JSX.Element;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  checkLoggedIn: () => false as boolean,
});

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  const [user] = useAuthState(fireBaseAuth);
  const [signOut] = useSignOut(fireBaseAuth);

  const logout = async () => {
    try {
      localStorage.removeItem('beesmart_token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('idCh');
      setIsAuthenticated(false);
      if (user) {
        await signOut();
      }
      // Navigate to the login page
      navigate(LOGIN);
    } catch (error) {
      console.error('Đăng xuất thất bại', error);
    }
  };
  const checkLoggedIn = () => {
    const token = localStorage.getItem('beesmart_token');
    if (token) {
      setIsAuthenticated(true);
      return true;
    } else {
      setIsAuthenticated(false);
      navigate(LOGIN, { replace: true });
      message.info('Vui lòng đăng nhập');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, checkLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
