// 극장관리 시스템 타입 정의

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'director' | 'actor' | 'staff';
  profileImage?: string;
  createdAt: Date;
}

export interface Production {
  id: string;
  title: string;
  description: string;
  synopsis: string;
  genre: string;
  status: '기획' | '캐스팅' | '리허설' | '공연' | '종료';
  startDate: Date;
  endDate: Date;
  venue: string;
  budget: number;
  director: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  id: string;
  title: string;
  description?: string;
  type: '리허설' | '공연' | '회의' | '오디션';
  productionId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  attendees: string[];
  isAllDay: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  type: 'general' | 'announcement' | 'urgent';
  sender: string;
  recipients: string[];
  productionId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  category: 'script' | 'design' | 'music' | 'photo' | 'document';
  productionId?: string;
  uploadedBy: string;
  uploadedAt: Date;
}