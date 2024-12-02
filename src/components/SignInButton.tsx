'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function SignInButton() {
  return (
    <div className="container">
      <h1 className="text-center text-4xl text-pink-500 mb-10">SIGN IN</h1>

      <div className="separator mb-8"></div>

      {/* Google Sign-In Button */}
      <button
        className="google__btn flex items-center justify-center gap-4 w-full max-w-[680px] mx-auto mb-4 rounded-lg p-3"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <Image src="/google-logo.png" height={30} width={30} alt="Google" />
        <span className="flex items-center justify-center relative -top-[38px]">
          Sign in with Google
        </span>
      </button>

      {/* GitHub Sign-In Button */}
      <button
        className="github__btn flex items-center justify-center gap-4 w-full max-w-[680px] mx-auto mb-4 rounded-lg p-3"
        onClick={() => signIn('github', { callbackUrl: '/' })}
      >
        <Image src="/github-logo.png" height={30} width={30} alt="GitHub" />
        <span className="flex items-center justify-center relative -top-[38px]">
          Sign in with GitHub
        </span>
      </button>
    </div>
  )
}
