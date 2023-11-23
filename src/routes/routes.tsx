import { Route, Routes } from 'react-router-dom';

import { Home, Login, NotFound, Products, Protected } from 'src/pages';
import Sale from 'src/pages/Sale';
import * as authRoutes from 'src/routes/routes.auth';
import * as publicRoutes from 'src/routes/routes.public';
import MainLayout from 'src/Layout/MainLayout';
import ChangePassword from 'src/pages/ChangePassword';
import ChangeUserInfo from 'src/pages/ChangeUserInfo';

import ProtectedRoute from './ProtectedRoute';

function MainRoutes() {
  return (
    <Routes>
      <Route
        path='/protected'
        element={
          <ProtectedRoute>
            <Protected />
          </ProtectedRoute>
        }
      ></Route>
      <Route element={<MainLayout />}>
        <Route
          path={authRoutes.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={authRoutes.PRODUCTS}
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={authRoutes.CHANGE_PASSWORD}
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={authRoutes.CHANGE_USER_INFO}
          element={
            <ProtectedRoute>
              <ChangeUserInfo />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
      <Route
        path={authRoutes.SALE}
        element={
          <ProtectedRoute>
            <Sale />
          </ProtectedRoute>
        }
      ></Route>

      <Route path={publicRoutes.LOGIN} element={<Login />}></Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
