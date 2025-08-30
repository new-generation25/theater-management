'use client';

import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import koKR from 'antd/locale/ko_KR';

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={koKR}
        theme={{
          token: {
            colorPrimary: '#722ed1', // 보라색 테마 (극장 컬러)
            borderRadius: 8,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}