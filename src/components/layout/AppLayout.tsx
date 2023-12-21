import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SideBar from './SideBar';

const { Content, Header } = Layout;

const AppLayout = function () {
  const { t } = useTranslation();

  return (
    <Layout className="app-layout-wrapper">
      <Header className="app-header">
        {t('components.layout.headerTitle')}
        <Button type="primary" ghost>
          {t('components.layout.logout')}
        </Button>
      </Header>
      <Layout>
        <SideBar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
