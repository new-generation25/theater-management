'use client';

import { Layout, Menu, Avatar, Dropdown, Badge } from 'antd';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  TeamOutlined, 
  MessageOutlined,
  FolderOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 메뉴 아이템 설정
  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '대시보드',
    },
    {
      key: '/productions',
      icon: <TeamOutlined />,
      label: '프로덕션 관리',
    },
    {
      key: '/schedule',
      icon: <CalendarOutlined />,
      label: '일정 관리',
    },
    {
      key: '/messages',
      icon: <MessageOutlined />,
      label: '메시징',
    },
    {
      key: '/files',
      icon: <FolderOutlined />,
      label: '파일 관리',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '설정',
    },
  ];

  // 사용자 드롭다운 메뉴
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '프로필',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
    },
  ];

  // 메뉴 클릭 핸들러
  const handleMenuClick: NonNullable<MenuProps['onClick']> = (e) => {
    router.push(e.key.toString());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 사이드바 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#722ed1', 
            fontSize: collapsed ? '18px' : '20px',
            fontWeight: 'bold'
          }}>
            {collapsed ? '🎭' : '🎭 극장관리'}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ border: 'none' }}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* 메인 레이아웃 */}
      <Layout>
        {/* 헤더 */}
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h3 style={{ margin: 0, color: '#722ed1' }}>
              현재 프로덕션: 햄릿
            </h3>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* 알림 아이콘 */}
            <Badge count={3} size="small">
              <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
            </Badge>
            
            {/* 사용자 프로필 */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ display: collapsed ? 'none' : 'inline' }}>관리자</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 메인 콘텐츠 */}
        <Content style={{ 
          margin: '24px', 
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 112px)'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}