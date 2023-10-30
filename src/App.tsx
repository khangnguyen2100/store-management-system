import { ConfigProvider, Spin } from 'antd';
import vnVN from 'antd/lib/locale/vi_VN';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import MainRoutes from 'src/routes/routes';

import { AuthProvider } from './routes/AuthContext';

function App() {
  return (
    <BrowserRouter basename='/'>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          refreshWhenHidden: true,
          fetcher: (resource, init) =>
            fetch(resource, init).then(res => res.json()),
        }}
      >
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
                <MainRoutes />
              </React.Suspense>
            </AuthProvider>
          </SnackbarProvider>
        </ConfigProvider>
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
