import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, NotFound, Login, Protected, Products } from 'src/pages';
import Suppilers from 'src/pages/Suppliers';

import ProtectedRoute from './ProtectedRoute';

function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route
        path='/protected'
        element={
          <ProtectedRoute>
            <Protected />
          </ProtectedRoute>
        }
      ></Route>
      <Route path='/dang-nhap' element={<Login />}></Route>
      <Route path='/san-pham' element={<Products />}></Route>
      <Route path='*' element={<NotFound />} />
      <Route path='/nha-cung-cap' element={<Suppilers />}></Route>
    </Routes>
  );
}

export default MainRoutes;
