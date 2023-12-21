import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthForm from './components/authForm/AuthForm';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/login',
        element: <AuthForm title="login" />,
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
