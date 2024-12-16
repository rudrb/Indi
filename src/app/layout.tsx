'use client'

import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/FloatingSidebar'
import Footer from '../components/Footer' // Footer 컴포넌트 임포트
import './globals.css' // 전역 CSS 임포트

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isSidebarActive = true // 사이드바 활성화 여부

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        {/* 세션 컨텍스트 제공 */}
        <SessionProvider>
          <div className="flex flex-1">
            {/* 사이드바 */}
            <Sidebar />
            {/* 네비게이션 바 및 페이지 내용 */}
            <div
              className={`w-full flex-1 ${
                isSidebarActive ? 'ml-0' : 'ml-0'
              } transition-all duration-300`}
            >
              <Navbar />
              {/* 페이지 내용 */}
              <main>{children}</main>
            </div>
          </div>
          {/* 푸터 추가 */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
