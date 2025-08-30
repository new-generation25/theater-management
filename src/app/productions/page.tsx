'use client';

import { Card, Button, Table, Tag, Progress, Space, Modal, Form, Input, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function ProductionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 샘플 데이터
  const sampleProductions = [
    {
      key: '1',
      title: '햄릿',
      genre: '비극',
      status: '리허설',
      progress: 75,
      startDate: '2024-09-01',
      endDate: '2024-10-15',
      director: '김연출',
    },
    {
      key: '2',
      title: '로미오와 줄리엣',
      genre: '로맨스',
      status: '캐스팅',
      progress: 30,
      startDate: '2024-11-01',
      endDate: '2024-12-20',
      director: '박연출',
    },
    {
      key: '3',
      title: '한여름 밤의 꿈',
      genre: '코미디',
      status: '기획',
      progress: 10,
      startDate: '2025-01-15',
      endDate: '2025-03-10',
      director: '이연출',
    },
  ];

  interface ProductionRow {
    key: string;
    title: string;
    genre: string;
    status: '기획' | '캐스팅' | '리허설' | '공연' | '종료';
    progress: number;
    startDate: string;
    endDate: string;
    director: string;
  }

  const columns: Array<{
    title: string;
    dataIndex?: keyof ProductionRow;
    key: string;
    render?: (value: unknown, record: ProductionRow) => React.ReactNode;
  }> = [
    {
      title: '작품명',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: '장르',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '기획': 'blue',
          '캐스팅': 'orange',
          '리허설': 'purple',
          '공연': 'green',
          '종료': 'gray'
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '진행률',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress 
          percent={progress} 
          size="small"
          status={progress === 100 ? 'success' : 'active'}
        />
      ),
    },
    {
      title: '연출',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: '기간',
      key: 'period',
      render: (_value, record) => `${record.startDate} ~ ${record.endDate}`,
    },
    {
      title: '작업',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>수정</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>삭제</Button>
        </Space>
      ),
    },
  ];

  const handleAddProduction = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('새 프로덕션:', values);
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <AppLayout>
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px' 
        }}>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#722ed1' }}>
            📋 프로덕션 관리
          </h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddProduction}
          >
            새 프로덕션 추가
          </Button>
        </div>

        <Card>
          <Table 
            columns={columns} 
            dataSource={sampleProductions}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* 새 프로덕션 추가 모달 */}
        <Modal
          title="새 프로덕션 추가"
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={600}
          okText="추가"
          cancelText="취소"
        >
          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: '20px' }}
          >
            <Form.Item
              label="작품명"
              name="title"
              rules={[{ required: true, message: '작품명을 입력해주세요!' }]}
            >
              <Input placeholder="예: 햄릿" />
            </Form.Item>

            <Form.Item
              label="장르"
              name="genre"
              rules={[{ required: true, message: '장르를 선택해주세요!' }]}
            >
              <Select placeholder="장르 선택">
                <Option value="비극">비극</Option>
                <Option value="희극">희극</Option>
                <Option value="로맨스">로맨스</Option>
                <Option value="코미디">코미디</Option>
                <Option value="뮤지컬">뮤지컬</Option>
                <Option value="기타">기타</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="연출자"
              name="director"
              rules={[{ required: true, message: '연출자를 입력해주세요!' }]}
            >
              <Input placeholder="연출자 이름" />
            </Form.Item>

            <Form.Item
              label="공연 기간"
              name="dateRange"
              rules={[{ required: true, message: '공연 기간을 선택해주세요!' }]}
            >
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="시놉시스"
              name="description"
            >
              <Input.TextArea 
                rows={4}
                placeholder="작품 소개 및 시놉시스를 입력하세요"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AppLayout>
  );
}