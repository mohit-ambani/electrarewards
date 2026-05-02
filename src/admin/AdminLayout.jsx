import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UploadOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const getSelectedKey = () => {
    if (location.pathname.startsWith('/admin/redemptions')) return 'redemptions';
    if (location.pathname.startsWith('/admin/bulk-upload')) return 'bulk-upload';
    return 'dashboard';
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'dashboard') history.push('/admin');
    if (key === 'redemptions') history.push('/admin/redemptions');
    if (key === 'bulk-upload') history.push('/admin/bulk-upload');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={240}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#001529',
        }}
      >
        <div
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            marginBottom: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThunderboltOutlined
              style={{ fontSize: 28, color: '#fadb14' }}
            />
            <div>
              <div
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                ElectraRewards
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 12,
                }}
              >
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="redemptions" icon={<ShoppingOutlined />}>
            Redemptions
          </Menu.Item>
          <Menu.Item key="bulk-upload" icon={<UploadOutlined />}>
            Bulk Upload
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 240 }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            {getSelectedKey() === 'dashboard' ? 'Dashboard' : getSelectedKey() === 'bulk-upload' ? 'Bulk Upload' : 'Redemptions'}
          </span>
        </Header>

        <Content
          style={{
            margin: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>

        <Footer style={{ textAlign: 'center', color: '#999' }}>
          ElectraRewards Admin v2.0
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
