'use client';

import { Card, Calendar, Badge, List, Button, Modal, Form, Input, Select, DatePicker, TimePicker, Tag } from 'antd';
import { PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { Dayjs } from 'dayjs';

const { Option } = Select;

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 샘플 일정 데이터
  const scheduleData = {
    '2024-08-30': [
      { type: 'success', content: '햄릿 통연습 (10:00-16:00)' },
      { type: 'processing', content: '로미오와 줄리엣 오디션 (19:00-21:00)' },
    ],
    '2024-08-31': [
      { type: 'error', content: '긴급 제작회의 (14:00-15:00)' },
    ],
    '2024-09-01': [
      { type: 'success', content: '햄릿 무대연습 (13:00-17:00)' },
      { type: 'default', content: '의상 피팅 (18:00-19:00)' },
    ],
  };

  const todaySchedule = [
    {
      title: '햄릿 통연습',
      time: '10:00 - 16:00',
      location: '대극장',
      type: '리허설',
      attendees: 12,
    },
    {
      title: '로미오와 줄리엣 오디션',
      time: '19:00 - 21:00',
      location: '소극장',
      type: '오디션',
      attendees: 8,
    },
    {
      title: '제작진 회의',
      time: '21:30 - 22:30',
      location: '회의실',
      type: '회의',
      attendees: 5,
    },
  ];

  const getListData = (value: Dayjs) => {
    const dateKey = value.format('YYYY-MM-DD');
    return scheduleData[dateKey as keyof typeof scheduleData] || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <div style={{ minHeight: '60px' }}>
        {listData.map((item, index) => (
          <div key={`${value.format('YYYYMMDD')}-${index}`} style={{ marginBottom: '2px' }}>
            <Badge 
              status={item.type as 'success' | 'processing' | 'default' | 'error' | 'warning'} 
              text={
                <span style={{ 
                  fontSize: '11px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                  maxWidth: '120px'
                }}>
                  {item.content}
                </span>
              } 
            />
          </div>
        ))}
      </div>
    );
  };

  const handleAddSchedule = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('새 일정:', values);
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
            📅 일정 관리
          </h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddSchedule}
          >
            새 일정 추가
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', minHeight: '600px' }}>
          {/* 메인 캘린더 */}
          <div style={{ flex: 1 }}>
            <Card title="월간 캘린더">
              <Calendar 
                dateCellRender={dateCellRender}
              />
            </Card>
          </div>

          {/* 오늘 일정 */}
          <Card title={`📋 오늘 일정 (${new Date().toLocaleDateString('ko-KR')})`}>
            <List
              dataSource={todaySchedule}
              renderItem={(item, idx) => (
                <List.Item
                  key={`today-${idx}`}
                  actions={[
                    <Button key="edit" type="link" size="small">수정</Button>,
                    <Button key="delete" type="link" size="small" danger>삭제</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
                    title={
                      <span>
                        {item.title} 
                        <Tag color="blue" style={{ marginLeft: '8px' }}>{item.type}</Tag>
                      </span>
                    }
                    description={
                      <div>
                        <div>⏰ {item.time}</div>
                        <div>📍 {item.location}</div>
                        <div>👥 참석자 {item.attendees}명</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        {/* 새 일정 추가 모달 */}
        <Modal
          title="새 일정 추가"
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
              label="일정 제목"
              name="title"
              rules={[{ required: true, message: '일정 제목을 입력해주세요!' }]}
            >
              <Input placeholder="예: 햄릿 리허설" />
            </Form.Item>

            <Form.Item
              label="일정 유형"
              name="type"
              rules={[{ required: true, message: '일정 유형을 선택해주세요!' }]}
            >
              <Select placeholder="유형 선택">
                <Option value="리허설">리허설</Option>
                <Option value="공연">공연</Option>
                <Option value="회의">회의</Option>
                <Option value="오디션">오디션</Option>
                <Option value="워크샵">워크샵</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="날짜"
              name="date"
              rules={[{ required: true, message: '날짜를 선택해주세요!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <div style={{ display: 'flex', gap: '16px' }}>
              <Form.Item
                label="시작 시간"
                name="startTime"
                style={{ flex: 1 }}
                rules={[{ required: true, message: '시작 시간을 선택해주세요!' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="종료 시간"
                name="endTime"
                style={{ flex: 1 }}
                rules={[{ required: true, message: '종료 시간을 선택해주세요!' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </div>

            <Form.Item
              label="장소"
              name="location"
              rules={[{ required: true, message: '장소를 입력해주세요!' }]}
            >
              <Input placeholder="예: 대극장, 연습실 1" />
            </Form.Item>

            <Form.Item
              label="설명"
              name="description"
            >
              <Input.TextArea 
                rows={3}
                placeholder="일정에 대한 추가 설명을 입력하세요"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AppLayout>
  );
}