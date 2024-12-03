'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  const { status, data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }) // 로그아웃 후 메인 화면으로 리다이렉트
  }

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-gray-300 px-8 py-4 shadow gap-4 border-b-4 border-brown-500">
      <div className="flex gap-2 items-center">
        <Image
          src={session?.user?.image ?? '/default-avatar.png'}
          width={40}
          height={40}
          alt={session?.user?.name ?? 'user'}
          className="rounded-full"
        />
        <span className="text-gray-800 font-bold">{session?.user?.name}</span>
      </div>
      <hr className="my-6 border-blueGray-600" />
      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-bold text-white hover:underline hover:text-brown-600"
      ></Link>

      {/* Navigation Links */}

      {/* User Actions */}
      <div className="flex gap-4 items-center">
        {status === 'authenticated' ? (
          <>
            {/* Product Add Button */}
            {/* User Info */}
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-md text-lg font-bold transition-all"
            >
              Sign Out
            </button>{' '}
            <Link
              href="/addTopic"
              className="bg-pink-400 hover:bg-pink-300 text-white px-4 py-2 rounded-md text-lg font-bold transition-all"
            >
              상품 등록
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-lime-200 hover:bg-lime-300 text-black px-4 py-2 rounded-md text-lg font-bold transition-all"
          >
            Login
          </Link>
        )}
        <hr className="my-6 border-blueGray-600" />
      </div>
    </nav>
  )
}
