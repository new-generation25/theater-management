# 🎭 극장관리 시스템

소규모 극단을 위한 통합 관리 플랫폼

## 🚀 기술 스택

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **UI Library**: Ant Design (한국어 지원)
- **Backend**: Next.js API Routes
- **Database**: Google Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 대시보드 (메인 페이지)
│   ├── login/             # 로그인 페이지
│   ├── productions/       # 프로덕션 관리
│   ├── schedule/          # 일정 관리
│   └── messages/          # 메시징 시스템
├── components/
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── auth/             # 인증 관련 컴포넌트
│   ├── production/       # 프로덕션 관련 컴포넌트
│   ├── calendar/         # 캘린더 컴포넌트
│   └── providers/        # Context Provider들
├── lib/
│   └── firebase.ts       # Firebase 설정
└── types/
    └── index.ts          # TypeScript 타입 정의
```

## 🎯 구현된 기능 (1차)

### ✅ 완료된 기능
1. **📱 기본 레이아웃**
   - 반응형 사이드바 네비게이션
   - 헤더 (현재 프로덕션, 알림, 사용자 프로필)
   - 모바일 친화적 인터페이스

2. **🏠 대시보드**
   - 핵심 통계 (프로덕션, 일정, 팀원, 파일)
   - 프로덕션 진행 상황 프로그레스 바
   - 최근 활동 타임라인

3. **📋 프로덕션 관리**
   - 프로덕션 목록 테이블
   - 상태별 색상 태그 (기획/캐스팅/리허설/공연/종료)
   - 프로덕션 추가 모달 폼

4. **📅 일정 관리**
   - 월간 캘린더 뷰
   - 일정별 색상 뱃지 표시
   - 오늘 일정 상세 목록
   - 일정 추가 모달 폼

5. **💬 메시징 시스템**
   - 채팅방 목록 (전체공지/팀별)
   - 실시간 메시지 인터페이스
   - 읽지 않은 메시지 뱃지

6. **🔐 인증 시스템**
   - 로그인 페이지 UI
   - 이메일/비밀번호 폼 검증

## ⚙️ 설치 및 실행

### 1. 의존성 설치
```bash
cd theater-management
npm install
```

### 2. Firebase 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication, Firestore, Storage 활성화
3. `.env.local` 파일의 설정값 업데이트

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 🔧 Firebase 설정 방법

### 1. Firebase 프로젝트 생성
1. Firebase Console 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `theater-management`

### 2. 서비스 활성화
- **Authentication**: Email/Password 로그인 활성화
- **Firestore**: 데이터베이스 생성 (테스트 모드)
- **Storage**: 파일 저장소 생성

### 3. 웹앱 설정
1. 프로젝트 설정 → 앱 추가 → 웹
2. 설정 정보를 `.env.local`에 복사

## 📱 페이지 구성

- **/** : 대시보드 (통계, 진행상황, 최근활동)
- **/login** : 로그인 페이지
- **/productions** : 프로덕션 관리 (목록, 추가, 수정)
- **/schedule** : 일정 관리 (캘린더, 오늘일정)
- **/messages** : 메시징 시스템 (채팅방, 메시지)

## 🚀 다음 단계 (2차 구현)

### 우선순위 기능
1. **Firebase 연동**
   - 실제 데이터 저장/조회
   - 사용자 인증 구현
   - 실시간 업데이트

2. **핵심 기능 완성**
   - 프로덕션 CRUD
   - 일정 CRUD
   - 실시간 메시징

3. **사용자 관리**
   - 역할별 권한 (관리자/연출/배우/스태프)
   - 팀원 초대 시스템

4. **파일 관리**
   - 대본, 디자인 파일 업로드
   - 버전 관리

## 💻 개발 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 📞 지원

문제가 발생하면 개발자에게 문의하세요!
