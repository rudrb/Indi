// app/add-topic/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddTopicPage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    redirect('/login') // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
  }

  const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'ay1ovxr7') // Cloudinary에서 설정한 upload preset
    formData.append('cloud_name', 'dkce7iuyq') // Cloudinary Cloud Name

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkce7iuyq/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      return data.secure_url // 업로드된 이미지 URL 반환
    } catch (error) {
      console.error('Cloudinary 이미지 업로드 실패:', error)
      throw new Error('이미지 업로드에 실패했습니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !description) {
      alert('제목과 내용을 모두 작성해주세요.')
      return
    }

    setLoading(true)
    let imageUrl = ''

    try {
      if (image) {
        imageUrl = await uploadImageToCloudinary(image)
      }

      const payload = {
        title,
        description,
        image: imageUrl,
        userEmail: session?.user?.email || '',
      }

      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert('게시물이 성공적으로 등록되었습니다.')
        router.push('/')
      } else {
        throw new Error('게시물 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('게시물 등록 에러:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto my-8 max-w-4xl px-2">
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        - -게시물 등록- -
      </h2>
      <form
        className="border border-gray-900 rounded-lg bg-white shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        {/* 이미지 업로드 */}
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            이미지 넣기
          </label>
          <div className="border-solid border-2 border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* 제목 */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full border-2 border-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 내용 */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 font-bold text-gray-900 text-sm"
          >
            내용
          </label>
          <textarea
            id="description"
            placeholder="내용을 입력하세요"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="w-full border-2 border-gray-800 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 등록 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          {loading ? '등록 중...' : '게시물 등록'}
        </button>
      </form>
    </div>
  )
}
