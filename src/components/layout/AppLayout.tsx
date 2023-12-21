import { Layout } from 'antd';

const {
  Footer, Header, Sider,
} = Layout;

const AppLayout = function () {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider width="25%">
          Sider
        </Sider>

      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default AppLayout;
