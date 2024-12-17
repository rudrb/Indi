import SignInButton from '@/components/SignInButton'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* 로그인 카드 */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        {/* 제목 섹션 */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sign in to access your account.
        </p>

        {/* 로그인 버튼 */}
        <div className="flex justify-center">
          <SignInButton />
        </div>
      </div>

      {/* 하단 링크 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Don&#39;t have an account?{' '}
          <a
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
