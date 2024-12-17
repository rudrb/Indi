'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 세션이 로딩 중일 때 처리
  if (status === 'loading')
    return <div className="text-center text-xl text-gray-600">로딩 중...</div>

  // 세션이 없다면 로그인 페이지로 리디렉션
  if (!session) {
    router.push('/login')
    return (
      <div className="text-center text-xl text-red-600">
        로그인이 필요합니다
      </div>
    )
  }

  return (
    <div className="container mx-auto my-8 max-w-4xl p-4 bg-white rounded-lg shadow-lg">
      {/* 대시보드 헤더 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        나의 대시보드
      </h1>

      {/* 사용자 정보 섹션 */}
      <div className="mb-8 p-6 bg-gray-50 border-2 border-primary rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">내 정보</h2>
        <div className="flex items-center space-x-4">
          {/* 프로필 이미지 */}
          <Image
            src="/default.jpg" // 기본 이미지 경로를 설정
            alt="Default Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          {/* 사용자 정보 */}
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
      </div>

      {/* 목표 섹션 */}
      <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          나의 목표
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 목표 카드 1 */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              단기 목표
            </h3>
            <p className="text-gray-700">학점 챙기기, 몸 관리 잘하기</p>
          </div>
          {/* 목표 카드 2 */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              방학 때 할 것
            </h3>
            <p className="text-gray-700">
              1. 현재로써 부족한 지식 채우기, 2. 여행가기{' '}
            </p>
          </div>
          {/* 목표 카드 3 */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              장기 목표
            </h3>
            <p className="text-gray-700">정보보안기사 자격증 따기</p>
          </div>
          {/* 목표 카드 4 */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              되고 싶은 직업
            </h3>
            <p className="text-gray-700">디지털포렌식수사관</p>
            {/* 화살표 추가 */}
            <div className="flex justify-center my-6">
              <div className="animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>

            {/* 큰 박스 추가 */}
            <div className="p-6 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                현재 달성한 업적
              </h2>
              <p className="text-gray-700 text-center">
                네트워크 관리사 2급 자격증 취득
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
