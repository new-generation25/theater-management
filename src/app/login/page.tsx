'use client';

import { Card, Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LoginPage() {
  interface LoginFormValues {
    email: string;
    password: string;
  }

  const onFinish = (values: LoginFormValues) => {
    console.log('로그인 정보:', values);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#722ed1', marginBottom: '8px' }}>
              🎭 극장관리
            </Title>
            <Text type="secondary">
              소규모 극단을 위한 통합 관리 플랫폼
            </Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="이메일"
              name="email"
              rules={[
                { required: true, message: '이메일을 입력해주세요!' },
                { type: 'email', message: '올바른 이메일 형식이 아닙니다!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="이메일을 입력하세요"
              />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="비밀번호를 입력하세요"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                style={{ width: '100%', height: '40px' }}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              계정이 없으신가요? <a href="/register" style={{ color: '#722ed1' }}>회원가입</a>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}