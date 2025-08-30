'use client';

import { Card, Row, Col, Statistic, Progress, Timeline } from 'antd';
import { 
  TeamOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  FolderOutlined 
} from '@ant-design/icons';
import AppLayout from '@/components/layout/AppLayout';

export default function Dashboard() {
  return (
    <AppLayout>
      <div>
        <h1 style={{ fontSize: '24px', marginBottom: '24px', color: '#722ed1' }}>
          🎭 극장관리 대시보드
        </h1>
        
        {/* 통계 카드들 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="진행 중인 프로덕션"
                value={3}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="오늘 일정"
                value={5}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="팀 멤버"
                value={18}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="파일 수"
                value={127}
                prefix={<FolderOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 프로덕션 진행 상황 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="📋 프로덕션 진행 상황" style={{ height: '400px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h4>햄릿</h4>
                <Progress percent={75} status="active" />
                <p style={{ margin: '8px 0', fontSize: '12px', color: '#666' }}>
                  리허설 단계 - 3주 남음
                </p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <h4>로미오와 줄리엣</h4>
                <Progress percent={30} />
                <p style={{ margin: '8px 0', fontSize: '12px', color: '#666' }}>
                  캐스팅 단계 - 8주 남음
                </p>
              </div>
              
              <div>
                <h4>한여름 밤의 꿈</h4>
                <Progress percent={10} />
                <p style={{ margin: '8px 0', fontSize: '12px', color: '#666' }}>
                  기획 단계 - 12주 남음
                </p>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="📅 최근 활동" style={{ height: '400px' }}>
              <Timeline
                items={[
                  {
                    children: '햄릿 드레스 리허설 완료',
                    color: 'green',
                  },
                  {
                    children: '로미오와 줄리엣 오디션 공고 발송',
                    color: 'blue',
                  },
                  {
                    children: '무대 디자인 최종 승인',
                    color: 'gray',
                  },
                  {
                    children: '의상 피팅 일정 조정',
                    color: 'orange',
                  },
                  {
                    children: '새로운 팀 멤버 합류',
                    color: 'purple',
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
}
