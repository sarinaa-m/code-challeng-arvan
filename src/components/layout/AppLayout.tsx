import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import HeaderWrapper from './HeaderWrapper'
import useMediaQuery from 'use-media-antd-query'
const { Content } = Layout

const AppLayout = () => {
  const windowSize = useMediaQuery()
  return (
    <Layout className="app-layout-wrapper">
      <HeaderWrapper />
      <Layout>
        {windowSize !== 'xs' && windowSize !== 'sm' && <SideBar />}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
