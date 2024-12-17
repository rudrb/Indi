'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation' // next/navigation에서 useRouter를 가져오기
import UserTopicList from '@/components/UserTopicList'
import Image from 'next/image'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 세션이 로딩 중일 때 처리
  if (status === 'loading')
    return <div className="text-center text-xl text-gray-600">로딩 중...</div>

  // 세션이 없다면 로그인 페이지로 리디렉션 또는 '로그인 필요' 메시지 표시
  if (!session) {
    // 로그인 페이지로 리디렉션
    router.push('/login')
    return (
      <div className="text-center text-xl text-red-600">
        로그인이 필요합니다
      </div>
    )
  }

  return (
    <div className="container mx-auto my-8 max-w-4xl p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        .................................................................................................................
      </h1>

      {/* 사용자 정보 */}
      <div className="mb-6 p-4 bg-gray-50 border-2 border-primary rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">내 정보</h2>
        {/* 기본 이미지 추가 */}
        <div className="my-2 flex justify-center">
          <Image
            src="/default.jpg" // 기본 이미지 경로를 수정
            alt="Default Profile"
            width={500}
            height={300}
          />
        </div>
        <div className="text-lg text-gray-700">
          <p className="mt-1">
            <span className="font-semibold">이름:</span>{' '}
            {session.user?.name || '이름 정보 없음'}
          </p>
          <p className="mt-1">
            <span className="font-semibold">이메일:</span>{' '}
            {session.user?.email || '이메일 정보 없음'}
          </p>
        </div>
      </div>

      {/* 내가 등록한 게시물 */}
      <div className="mb-6 p-4 bg-gray-50 border-2 border-primary rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          내가 등록한 게시물
        </h2>
        {/* session이 존재할 때만 UserTopicList를 렌더링 */}
        {session ? (
          <UserTopicList />
        ) : (
          <div className="text-gray-600">내가 등록한 게시물이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
