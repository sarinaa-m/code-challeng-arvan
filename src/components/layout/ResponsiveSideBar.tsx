import { Button, Col, Menu, Row } from 'antd'
import Drawer from 'rc-drawer'
import { MenuProps } from 'rc-menu'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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
    setOpen(true)
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
      >
        open
      </Button>
      <Drawer placement={'left'} onClose={onClose} open={open}>
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
