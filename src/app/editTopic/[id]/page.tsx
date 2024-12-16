'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

interface Topic {
  _id: string
  title: string
  description: string
  image?: string
  price: number
  category: string
}

export default function EditTopicPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
  }

  useEffect(() => {
    if (!id) return

    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/topics/${id}`)
        if (!res.ok) throw new Error('Failed to fetch topic')
        const data = await res.json()
        setTopic(data)
      } catch (error) {
        console.error('Error fetching topic:', error)
        setError('Failed to fetch topic data.')
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [id])

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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!topic) return

    try {
      setLoading(true)
      let imageUrl = topic.image // 기존 이미지 URL

      // 새 이미지를 업로드한 경우 Cloudinary에 업로드
      if (image) {
        imageUrl = await uploadImageToCloudinary(image)
      }

      // JSON 형식으로 수정된 데이터 서버로 전송
      const payload = {
        title: topic.title,
        description: topic.description,
        image: imageUrl, // Cloudinary URL
      }

      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // JSON 데이터 전송
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to update topic')

      alert('게시물이 성공적으로 수정되었습니다.')
      router.push('/')
    } catch (error) {
      console.error('Error updating topic:', error)
      alert('게시물 수정에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!topic) return <p>수정할 게시물을 찾을 수 없습니다.</p>

  return (
    <div className="container mx-auto my-8 max-w-4xl px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 수정</h2>
      <form
        onSubmit={handleUpdate}
        className="border border-gray-300 rounded-lg bg-white shadow-lg p-6"
      >
        {/* 게시물 제목 */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            게시물 이름름
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={topic.title}
            onChange={(e) => setTopic({ ...topic, title: e.target.value })}
            required
          />
        </div>

        {/* 게시물 설명 */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            게시물 설명
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={topic.description}
            onChange={(e) =>
              setTopic({ ...topic, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* 이미지 업로드 */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            게시물 이미지
          </label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
        </div>
        {topic.image && !image && (
          <div className="mt-6 flex flex-col items-center">
            <Image
              src={topic.image}
              alt="Current product"
              width={128}
              height={128}
              className="rounded-lg border border-gray-300"
            />
            <p className="mt-2 text-sm text-gray-600">현재 등록된 이미지</p>
          </div>
        )}

        {/* 수정 버튼 */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          수정하기
        </button>
      </form>
    </div>
  )
}
