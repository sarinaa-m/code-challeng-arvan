import { Button, Layout } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ResponsiveSideBar from './ResponsiveSideBar'

const { Header } = Layout

const HeaderWrapper = () => {
  const { t } = useTranslation()
  return (
    <Header className="app-header">
      <div>
        <ResponsiveSideBar />
        {t('components.layout.headerTitle')}
      </div>

      <Button type="primary" ghost>
        {t('components.layout.logout')}
      </Button>
    </Header>
  )
}

export default HeaderWrapper
