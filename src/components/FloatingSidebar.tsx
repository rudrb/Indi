'use client'

import {
  FiHome,
  FiUser,
  FiArrowUp,
  FiPlus,
  FiGithub,
  FiInstagram,
} from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function FloatingSidebar() {
  const { status } = useSession() // 세션 정보 가져오기

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 group ml-0">
      <div className="bg-[#1a1a1a]/70 backdrop-blur-lg rounded-full shadow-xl p-4 w-14 h-14 flex items-center justify-center group-hover:w-56 group-hover:h-auto transition-all duration-300 ease-in-out relative overflow-hidden">
        {/* 추가된 그래디언트 배경 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 group-hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>

        <ul className="flex flex-col items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* 홈 버튼 */}
          <li className="group relative flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <div className="min-w-[28px]">
                <FiHome size={28} />
              </div>
              <span className="text-lg font-medium hidden group-hover:inline">
                홈으로
              </span>
            </Link>
          </li>

          {/* 인증된 사용자를 위한 메뉴 */}
          {status === 'authenticated' && (
            <>
              <li className="group relative flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="min-w-[28px]">
                    <FiUser size={28} />
                  </div>
                  <span className="text-lg font-medium hidden group-hover:inline">
                    마이페이지
                  </span>
                </Link>
              </li>
              <li className="group relative flex items-center gap-4">
                <Link
                  href="/addTopic"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="min-w-[28px]">
                    <FiPlus size={28} />
                  </div>
                  <span className="text-lg font-medium hidden group-hover:inline">
                    게시물 등록
                  </span>
                </Link>
              </li>
            </>
          )}

          {/* Social Links: Instagram and GitHub */}
          <li className="group relative flex items-center gap-4">
            <Link
              href="https://www.instagram.com"
              target="_blank"
              className="flex items-center gap-4 text-gray-300 hover:text-pink-500 transition-colors"
            >
              <div className="min-w-[28px]">
                <FiInstagram size={28} />
              </div>
              <span className="text-lg font-medium hidden group-hover:inline">
                Instagram
              </span>
            </Link>
          </li>

          <li className="group relative flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <div className="min-w-[28px]">
                <FiGithub size={28} />
              </div>
              <span className="text-lg font-medium hidden group-hover:inline">
                GitHub
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
