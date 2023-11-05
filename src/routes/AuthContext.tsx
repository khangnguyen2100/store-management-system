/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from './routes.public';
import { message } from 'antd';

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

  const logout = async () => {
    try {
      // Call the logout API
      // await authApi.logout();
      localStorage.removeItem('beesmart_token');
      setIsAuthenticated(false);
      console.log('Logout successful', isAuthenticated);

      // Navigate to the login page
      navigate(LOGIN);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  const checkLoggedIn = () => {
    const token = localStorage.getItem('beesmart_token');
    if (token) {
      setIsAuthenticated(true);
      return true;
    } else {
      setIsAuthenticated(false);
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
