'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const { data: session, status } = useSession() // 세션 정보 가져오기

  const [isLoading, setIsLoading] = useState<boolean>(false) // 로딩 상태

  if (status === 'loading') {
    return <div>Loading.......</div> // 로딩 중에는 "Loading..." 표시
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut() // 로그아웃 시도
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false) // 로딩 끝
    }
  }

  return (
    <nav className="bg-[#1f2937] text-white p-4 w-full fixed top-0 left-0 z-10">
      <div className="flex items-center justify-between w-full">
        {/* 좌측 네비게이션 */}
        <div className="flex space-x-6">
          <Link href="/">
            <button className="px-6 py-3 bg-[#1E40AF] rounded-md hover:bg-[#1D4ED8] transition-all duration-300 ease-in-out text-lg font-semibold">
              홈
            </button>
          </Link>
        </div>

        {/* 중앙에 "게시물 올리기" 버튼 배치 */}
        <div className="flex justify-center flex-1">
          {session && (
            <Link href="/addTopic">
              <button className="px-10 py-3 bg-[#927823] rounded-md hover:bg-[#b68c2f] transition-all duration-300 ease-in-out text-lg font-semibold">
                게시물 올리기
              </button>
            </Link>
          )}
        </div>

        {/* 우측 네비게이션 */}
        <div className="flex space-x-6">
          {session ? (
            // 로그인 상태일 경우
            <div className="text-sm text-white flex items-center space-x-4">
              <span>{session.user?.name}</span>
              <Image
                src={session.user?.image || '/default-avatar.png'}
                alt="User Image"
                width={50}
                height={70}
              />
              {/* 마이페이지 링크 수정 */}
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-[#4CAF50] rounded-md hover:bg-[#45a049] transition-all duration-300 ease-in-out text-lg font-semibold">
                  마이페이지
                </button>
              </Link>
              {/* 로그아웃 버튼 */}
              <button
                onClick={handleLogout} // 로그아웃 처리
                className="px-6 py-3 bg-[#EF4444] rounded-md hover:bg-[#dc2626] transition-all duration-300 ease-in-out text-lg font-semibold"
                disabled={isLoading} // 로딩 중에는 버튼 비활성화
              >
                {isLoading ? '로딩 중...' : '로그아웃'}
              </button>
            </div>
          ) : (
            // 로그인 상태가 아니면 로그인 버튼 표시
            <Link href="/login">
              <button className="px-6 py-3 bg-[#4CAF50] rounded-md hover:bg-[#45a049] transition-all duration-300 ease-in-out text-lg font-semibold">
                로그인
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
