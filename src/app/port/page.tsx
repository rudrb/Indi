'use client'

import Link from 'next/link'
import { Roboto_Slab } from '@next/font/google'

// Google Fonts 불러오기
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const PortPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      {/* 제목에 링크 추가 */}
      <Link href="/">
        <h1
          className={`text-4xl font-bold mb-8 text-gray-800 hover:text-blue-500 cursor-pointer ${robotoSlab.className}`}
        >
          포트폴리오 페이지
        </h1>
      </Link>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* 큰 박스 1 */}
        <a
          href="https://finalteam.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">Team Project HomePage</h2>
          <p className="text-lg">
            팀별로 진행한 프로젝트 홈페이지 - 누르면 홈페이지로 이동합니다.
          </p>
        </a>

        {/* 큰 박스 2 */}
        <a
          href="https://page-rudrb.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-10 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">중간 프로젝트 홈페이지</h2>
          <p className="text-lg">
            중간고사때 진행한 개인 홈페이지 입니다. - 누르면 홈페이지로
            이동합니다.
          </p>
        </a>
      </div>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {/* 카드 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            daiso-shoppingmall
          </h2>
          <p className="text-gray-600 mb-6">첫 번째 프로젝트</p>
          <a
            href="https://daiso-shoppingmall.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              링크로 이동
            </button>
          </a>
        </div>

        {/* 카드 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            crud-main
          </h2>
          <p className="text-gray-600 mb-6">두 번째 프로젝트</p>
          <a
            href="https://crud-main-five.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              링크로 이동
            </button>
          </a>
        </div>

        {/* 카드 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">MongoDB</h2>
          <p className="text-gray-600 mb-6">세 번째 프로젝트</p>
          <a
            href="https://mongo-db-beta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              링크로 이동
            </button>
          </a>
        </div>

        {/* 카드 4 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            mongo-crud-action
          </h2>
          <p className="text-gray-600 mb-6">네 번째 프로젝트</p>
          <a
            href="https://vercel.com/rudrbs-projects/mongo-crud-action/9MNpmZpjkZTqCagLpTDNE6ondj5J"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              링크로 이동
            </button>
          </a>
        </div>

        {/* 카드 5 */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            clerkapi-second
          </h2>
          <p className="text-gray-600 mb-6">다섯 번째 프로젝트</p>
          <a
            href="https://clerkapi-second.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              링크로 이동
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PortPage
