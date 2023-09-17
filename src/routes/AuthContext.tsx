/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      localStorage.setItem('loggedIn', 'false');
      setIsAuthenticated(false);
      console.log('Logout successful', isAuthenticated);

      // Navigate to the login page
      navigate('/dang-nhap');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  const checkLoggedIn = () => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || '');
    setIsAuthenticated(loggedIn);
    return loggedIn;
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
