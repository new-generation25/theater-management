'use client';

import { Card, Form, Input, Button, Typography, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail } = useAuth();

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      await signInWithEmail(values.email, values.password);
      message.success('로그인 성공!');
      router.push('/');
    } catch (error) {
      console.error('로그인 오류:', error);
      message.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      message.success('구글 로그인 성공!');
      router.push('/');
    } catch (error) {
      console.error('구글 로그인 오류:', error);
      message.error('구글 로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setGoogleLoading(false);
    }
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

          {/* 구글 로그인 버튼 */}
          <Button
            icon={<GoogleOutlined />}
            size="large"
            onClick={handleGoogleLogin}
            loading={googleLoading}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderColor: '#4285f4',
              color: '#4285f4',
              fontWeight: 500
            }}
          >
            Google 계정으로 로그인
          </Button>

          <Divider style={{ margin: '8px 0' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>또는 이메일로 로그인</Text>
          </Divider>

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
                loading={loading}
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