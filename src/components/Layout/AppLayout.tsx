import Layout from 'antd/es/layout';

const { Content } = Layout;

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', minWidth: 280 }}>
      <Content style={{ padding: '24px' }}>
        <div
          style={{
            background: '#fff',
            minHeight: 280,
            padding: 24,
            borderRadius: 16,
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}

export default AppLayout;
