import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AuthForm from './components/authForm/AuthForm';
import AppLayout from './components/layout/AppLayout';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/login',
        element: <AuthForm title="login" />,
      },
      {
        path: '/articles',
        element: (
          <ConfigProvider theme={{
            token: {
              colorPrimary: '#5bc0de',
            },
            components: {
              Layout: {
                siderBg: '#1c7cd5',
                headerBg: '#373a3c',
              },
            },
          }}
          >
            <AppLayout />
          </ConfigProvider>
        ),
      },
      {
        path: '/register',
        element: (
          <AuthForm
            title="register"
            isRegister
            additionalFields={[{ label: 'user', name: 'user', rules: [] }]}
          />
        ),
      },
    ],
    {
      basename: '/',
    },
  );
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
