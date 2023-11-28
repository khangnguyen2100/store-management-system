import { ConfigProvider, Spin } from 'antd';
import vnVN from 'antd/lib/locale/vi_VN';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import MainRoutes from 'src/routes/routes';

import { request } from './api/config';
import { AuthProvider } from './routes/AuthContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const fetcher = (url: string) => request(url).then(res => res.data);
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename='/'>
        <SWRConfig
          value={{
            refreshInterval: 5 * 60 * 1000,
            refreshWhenHidden: true,
            fetcher: fetcher,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
              if (error.status === 404) return;
              if (error.status === 403) return;

              if (retryCount >= 0) return;

              setTimeout(() => revalidate({ retryCount }), 5000);
            },
            revalidateOnMount: true,
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
    </ErrorBoundary>
  );
}

export default App;
