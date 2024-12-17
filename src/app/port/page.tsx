'use client'

import Link from 'next/link'
import { Roboto_Slab } from '@next/font/google'

// Google Fonts 불러오기
const robotoSlab = Roboto_Slab({
  subsets: ['latin'], // 서브셋 설정
  weight: ['400', '700'], // 가중치 설정
})

const PortPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      {/* 제목 스타일에 Google Fonts 클래스 적용 */}
      <h1
        className={`text-4xl font-bold mb-8 text-gray-800 ${robotoSlab.className}`}
      >
        포트폴리오 페이지
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
        {/* 카드 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            프로젝트 1
          </h2>
          <p className="text-gray-600 mb-6">
            첫 번째 프로젝트의 상세 내용입니다.
          </p>
          <Link href="/project-1">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              자세히 보기
            </button>
          </Link>
        </div>

        {/* 카드 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            프로젝트 2
          </h2>
          <p className="text-gray-600 mb-6">
            두 번째 프로젝트의 상세 내용입니다.
          </p>
          <Link href="/project-2">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              자세히 보기
            </button>
          </Link>
        </div>

        {/* 추가 카드 생략... */}
      </div>
    </div>
  )
}

export default PortPage
