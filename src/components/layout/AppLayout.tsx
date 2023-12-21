import { Button, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import SideBar from './SideBar';

const { Footer, Header, Sider } = Layout;

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
      </Layout>
    </Layout>
  );
};

export default AppLayout;
