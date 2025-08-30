'use client';

import { Card, List, Avatar, Input, Button, Badge, Tag, Typography } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const { Search } = Input;
const { Text } = Typography;

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState('general');
  const [newMessage, setNewMessage] = useState('');

  // 샘플 채팅방 데이터
  const chatRooms = [
    {
      id: 'general',
      name: '전체 공지',
      type: 'announcement',
      unread: 2,
      lastMessage: '내일 리허설 시간이 변경되었습니다.',
      lastTime: '방금 전',
      participants: 18,
    },
    {
      id: 'hamlet',
      name: '햄릿 팀',
      type: 'production',
      unread: 5,
      lastMessage: '의상 피팅 일정을 확인해주세요.',
      lastTime: '10분 전',
      participants: 12,
    },
    {
      id: 'romeo',
      name: '로미오와 줄리엣',
      type: 'production',
      unread: 0,
      lastMessage: '오디션 결과를 곧 발표하겠습니다.',
      lastTime: '1시간 전',
      participants: 8,
    },
    {
      id: 'staff',
      name: '스태프 그룹',
      type: 'team',
      unread: 1,
      lastMessage: '무대 설치 도움이 필요합니다.',
      lastTime: '2시간 전',
      participants: 6,
    },
  ];

  // 샘플 메시지 데이터
  const messages = {
    general: [
      {
        id: '1',
        sender: '김연출',
        content: '안녕하세요. 내일 햄릿 리허설 시간이 오후 2시로 변경되었습니다.',
        time: '14:30',
        type: 'announcement',
        isOwn: false,
      },
      {
        id: '2',
        sender: '박관리',
        content: '네, 확인했습니다. 모든 배우분들께 전달하겠습니다.',
        time: '14:35',
        type: 'general',
        isOwn: true,
      },
    ],
    hamlet: [
      {
        id: '1',
        sender: '김연출',
        content: '오늘 리허설 정말 수고하셨습니다. 내일은 의상을 입고 진행하겠습니다.',
        time: '18:00',
        type: 'general',
        isOwn: false,
      },
      {
        id: '2',
        sender: '이배우',
        content: '의상 피팅 시간은 몇 시인가요?',
        time: '18:05',
        type: 'general',
        isOwn: false,
      },
      {
        id: '3',
        sender: '박관리',
        content: '오후 1시부터 개별적으로 진행됩니다. 개인 일정 확인해주세요.',
        time: '18:10',
        type: 'general',
        isOwn: true,
      },
    ],
  };

  const getTypeColor = (type: string) => {
    const colors = {
      announcement: 'red',
      production: 'purple',
      team: 'blue',
      general: 'default',
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('새 메시지:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <AppLayout>
      <div style={{ height: 'calc(100vh - 200px)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px' 
        }}>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#722ed1' }}>
            💬 메시징
          </h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
          >
            새 채팅방
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
          {/* 채팅방 목록 */}
          <Card 
            title="채팅방" 
            style={{ width: '300px', height: '100%' }}
            bodyStyle={{ padding: '8px', height: 'calc(100% - 57px)', overflow: 'auto' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <Search placeholder="채팅방 검색" />
            </div>
            <List
              size="small"
              dataSource={chatRooms}
              renderItem={(room) => (
                <List.Item
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedChat === room.id ? '#f0f0f0' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px',
                    margin: '4px 0'
                  }}
                  onClick={() => setSelectedChat(room.id)}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#722ed1' }}>{room.name[0]}</Avatar>}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{room.name}</span>
                        {room.unread > 0 && (
                          <Badge count={room.unread} size="small" />
                        )}
                      </div>
                    }
                    description={
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {room.lastMessage}
                        </Text>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                          <Tag color={getTypeColor(room.type)}>
                            {room.type === 'announcement' ? '공지' : 
                             room.type === 'production' ? '프로덕션' : '팀'}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            {room.lastTime}
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* 메시지 영역 */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{chatRooms.find(room => room.id === selectedChat)?.name}</span>
                <Tag color={getTypeColor(chatRooms.find(room => room.id === selectedChat)?.type || 'general')}>
                  👥 {chatRooms.find(room => room.id === selectedChat)?.participants}명
                </Tag>
              </div>
            }
            style={{ flex: 1, height: '100%' }}
            bodyStyle={{ 
              padding: '0',
              height: 'calc(100% - 57px)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* 메시지 목록 */}
            <div style={{ 
              flex: 1, 
              overflow: 'auto', 
              padding: '16px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <List
                dataSource={messages[selectedChat as keyof typeof messages] || []}
                renderItem={(message) => (
                  <List.Item style={{ 
                    justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                    border: 'none',
                    padding: '8px 0'
                  }}>
                    <div style={{
                      maxWidth: '70%',
                      backgroundColor: message.isOwn ? '#722ed1' : '#f0f0f0',
                      color: message.isOwn ? 'white' : 'black',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      borderBottomRightRadius: message.isOwn ? '4px' : '16px',
                      borderBottomLeftRadius: message.isOwn ? '16px' : '4px',
                    }}>
                      {!message.isOwn && (
                        <div style={{ 
                          fontSize: '12px', 
                          fontWeight: 'bold',
                          marginBottom: '4px',
                          color: '#722ed1'
                        }}>
                          {message.sender}
                        </div>
                      )}
                      <div>{message.content}</div>
                      <div style={{ 
                        fontSize: '11px', 
                        marginTop: '4px',
                        opacity: 0.7,
                        textAlign: 'right'
                      }}>
                        {message.time}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>

            {/* 메시지 입력 */}
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  onPressEnter={handleSendMessage}
                  style={{ flex: 1 }}
                />
                <Button 
                  type="primary" 
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                >
                  전송
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}