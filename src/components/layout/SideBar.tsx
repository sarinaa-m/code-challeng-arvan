import { Menu, MenuProps, Layout } from 'antd'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const { Sider } = Layout
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

const SideBar = function () {
  const { t } = useTranslation()
  const items: MenuItem[] = [
    getItem(<Link to="/articles">{t('menu.allArticles')}</Link>, 'all'),

    getItem(<Link to="/articles/create">{t('menu.newArticles')}</Link>, 'new'),
  ]
  return (
    <Sider>
      <Menu theme="dark" mode="vertical" items={items} />
    </Sider>
  )
}

export default SideBar
