'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EditTopicFormProps {
  id: string
  title: string
  description: string
  imageUrl: string
}

const EditTopicForm: React.FC<EditTopicFormProps> = ({
  id,
  title,
  description,
  imageUrl,
}) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [newImage, setNewImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewImage(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!newTitle.trim() || !newDescription.trim()) {
      setError('제목과 내용을 입력해주세요.')
      setLoading(false)
      return
    }

    let uploadedImageUrl = imageUrl // 기존 이미지 URL
    try {
      if (newImage) {
        // 이미지 업로드
        const imageFormData = new FormData()
        imageFormData.append('file', newImage)
        imageFormData.append('upload_preset', 'YOUR_UPLOAD_PRESET') // Cloudinary 설정 필요
        imageFormData.append('cloud_name', 'dpaobm7hr') // Cloudinary 설정 필요

        const uploadRes = await fetch(
          'https://api.cloudinary.com/v1_1/dpaobm7hr/image/upload', // Cloudinary URL
          {
            method: 'POST',
            body: imageFormData,
          }
        )

        if (!uploadRes.ok) throw new Error('이미지 업로드 실패')
        const uploadResult = await uploadRes.json()
        uploadedImageUrl = uploadResult.secure_url
      }

      // 수정 요청
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          image: uploadedImageUrl, // 수정된 이미지 URL
        }),
      })

      if (res.ok) {
        router.push('/') // 수정 후 홈으로 이동
      } else {
        const result = await res.json()
        setError(result.message || '수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('수정에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className="border border-slate-300 p-3 rounded-md"
        type="text"
        placeholder="제목"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        className="border border-slate-300 p-3 h-32 rounded-md"
        placeholder="내용"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md"
      >
        {loading ? '수정 중...' : '수정'}
      </button>
    </form>
  )
}

export default EditTopicForm
