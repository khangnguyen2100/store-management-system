import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, NotFound, Login, Protected } from 'src/pages';

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
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
