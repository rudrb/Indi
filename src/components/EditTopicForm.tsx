'use client' // 클라이언트 컴포넌트로 지정

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface EditTopicFormProps {
  id: string
  title: string
  description: string
  price: number | string
  imageUrl: string
}

const EditTopicForm: React.FC<EditTopicFormProps> = ({
  id,
  title,
  description,
  price,
  imageUrl,
}) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [newPrice, setNewPrice] = useState(price)
  const [newImage, setNewImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewImage(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData()
    formData.append('title', newTitle)
    formData.append('description', newDescription)
    formData.append('price', newPrice.toString())
    if (newImage) formData.append('image', newImage)

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        body: formData, // 수정된 데이터를 FormData로 전송
      })

      if (res.ok) {
        router.push('/') // 수정 완료 후 홈으로 리다이렉트
      } else {
        throw new Error('상품 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className="border border-slate-300 p-3 rounded-md"
        type="text"
        placeholder="상품명"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        className="border border-slate-300 p-3 h-32 rounded-md"
        placeholder="상세 설명"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <input
        className="border border-slate-300 p-3 rounded-md"
        type="number"
        placeholder="상품 가격"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md"
      >
        {loading ? '수정 중...' : '상품 수정'}
      </button>
    </form>
  )
}

export default EditTopicForm
