import { Button, Col, Drawer, Menu, Row } from 'antd'
import { MenuProps } from 'rc-menu'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const ResponsiveSideBar = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const items: MenuItem[] = [
    getItem(<Link to="/articles">{t('menu.allArticles')}</Link>, 'all'),
    getItem(<Link to="/articles/create">{t('menu.newArticles')}</Link>, 'new'),
  ]
  const showDrawer = () => {
    setOpen(!open)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        className="hamburger-menu-button"
        type="text"
        onClick={showDrawer}
        icon={<MenuOutlined color="#fff" />}
      />
      <Drawer
        placement={'left'}
        onClose={onClose}
        open={open}
        title={t('menu.menu')}
        closable={false}
        key={'left'}
        contentWrapperStyle={{
          width: 'min(20rem, 100vw)',
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Row>
          <Col span={24}>
            <Menu
              mode="inline"
              style={{ borderRight: 0 }}
              items={items}
              // openKeys={}
              // onOpenChange={onOpenChange}
              // onClick={onClose}
              className="responsive-sidebar-menu"
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}
export default ResponsiveSideBar
