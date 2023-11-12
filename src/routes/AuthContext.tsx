/* eslint-disable @typescript-eslint/no-empty-function */
import { message } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import authApi from 'src/api/authApi';
import { fireBaseAuth } from 'src/configs/firebase';
import { LOGIN } from './routes.public';
import { HOME } from './routes.auth';

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

  const handleLoginWithGoogle = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const UserImpl: any = user;
      const res = await authApi.loginWithGoogle({
        email: UserImpl?.email,
        token: UserImpl.accessToken,
      });
      if (res.status === 200) {
        localStorage.setItem('beesmart_token', res.data.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: res.data.tt_user[0].id,
            email: res.data.tt_user[0].email,
            HoTen: res.data.tt_user[0].HoTen,
            sdt: res.data.tt_user[0].sdt,
            Diachi: res.data.tt_user[0].Diachi,
            vaiTro: res.data.tt_user[0].vaiTro,
            idCh: res.data.tt_user[0].idCh,
            tenCh: res.data.tt_user[0].tenCh,
            tenLoaiCh: res.data.tt_user[0].tenLoaiCh,
            idLoaiCh: res.data.tt_user[0].idLoaiCh,
          }),
        );
        localStorage.setItem('idCh', res.data.tt_user[0].idCh);
        message.success('Đăng nhập thành công');
        setIsAuthenticated(true);
        navigate(HOME);
        return true;
      } else {
        message.error('Tài khoản chưa được đăng ký.');
        return false;
      }
    } catch (error) {
      console.log('login with google error:', error);
      return false;
    }
  };
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
  useEffect(() => {
    const checkGoogleAccount = async () => {
      if (user) {
        await handleLoginWithGoogle();
      }
    };
    checkGoogleAccount();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, checkLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
