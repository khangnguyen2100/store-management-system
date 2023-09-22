import { ConfigProvider, Spin } from 'antd';
import vnVN from 'antd/lib/locale/vi_VN';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import MainLayout from 'src/Layout/MainLayout';
import MainRoutes from 'src/routes/routes';

import { AuthProvider } from './routes/AuthContext';

function App() {
  return (
    <BrowserRouter basename='/'>
      <ConfigProvider
        locale={vnVN}
        theme={{
          token: {
            colorPrimary: '#6B77E5',
          },
        }}
      >
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <AuthProvider>
            <React.Suspense
              fallback={
                <div className='flex-center min-h-screen'>
                  <Spin size='large' />
                </div>
              }
            >
              <MainLayout>
                <MainRoutes />
              </MainLayout>
            </React.Suspense>
          </AuthProvider>
        </SnackbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
