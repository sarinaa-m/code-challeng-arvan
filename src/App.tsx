import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { AuthForm } from './components/authForm/AuthForm'
import AppLayout from './components/layout/AppLayout'
import ArticleLists from './components/atricles/ArticleLists'
import CreateArticles from './components/atricles/CreateArticles'

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
            additionalFields={[{ label: 'user', name: 'username', rules: [] }]}
          />
        ),
      },
      {
        path: 'articles',
        element: (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: ' #1c7cd5',
              },
              components: {
                Layout: {
                  siderBg: '#1c7cd5',
                  headerBg: '#373a3c',
                },
                Menu: {
                  darkItemBg: '#1c7cd5',
                  darkItemColor: '#fff',
                  darkItemSelectedBg: 'rgba(255, 255, 255, 0.15)',
                },
              },
            }}
          >
            <AppLayout />
          </ConfigProvider>
        ),
        children: [
          {
            path: '',
            element: <ArticleLists />,
          },
          {
            path: 'create',
            element: <CreateArticles />,
          },
        ],
      },
    ],
    {
      basename: '/',
    }
  )
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
