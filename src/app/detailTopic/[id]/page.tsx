'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import RemoveBtn from '@/components/RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import Image from 'next/image'
import React from 'react'

interface Topic {
  _id: string
  title: string
  description: string
  image?: string
  price: number
  userEmail: string
  category: string
}

export default function TopicDetailPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)

  // Modal 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)

  const { data: session } = useSession()
  const userEmail = session?.user?.email

  useEffect(() => {
    if (!id) return

    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/topics/${id}`)
        if (!res.ok) throw new Error('Failed to fetch topic')
        const data = await res.json()
        setTopic(data)

        const visitedProducts = JSON.parse(
          localStorage.getItem('visitedProducts') || '[]'
        )

        if (
          !visitedProducts.some((product: Topic) => product._id === data._id)
        ) {
          if (visitedProducts.length >= 10) {
            visitedProducts.shift()
          }
          visitedProducts.push(data)
          localStorage.setItem(
            'visitedProducts',
            JSON.stringify(visitedProducts)
          )
        }
      } catch (error) {
        console.error('Error fetching topic:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [id, userEmail])

  const handleImageClick = (image: string) => {
    setModalImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalImage(null)
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Image
          src="/load.gif" // 사용할 GIF 파일 경로
          alt="Loading animation"
          width={200}
          height={200}
        />
      </div>
    )
  if (!topic) return <div>게시물을 찾을 수 없습니다.</div>

  const isOwner = userEmail === topic.userEmail

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white shadow-xl rounded-lg border border-gray-300">
      <div className="relative">
        {/* 제목 글씨 크기 및 중앙 정렬 */}
        <h1 className="text-4xl font-bold mb-4 text-black text-center">
          {topic.title}
        </h1>

        {/* 이미지 클릭 시 모달 띄우기 */}
        {topic.image && (
          <div className="flex justify-center mb-6">
            <Image
              src={topic.image}
              alt={topic.title}
              width={600}
              height={400}
              unoptimized
              className="cursor-pointer rounded-lg shadow-lg border-2 border-gray-300"
              onClick={() => handleImageClick(topic.image!)}
            />
          </div>
        )}

        <p className="text-center text-gray-600 mb-6 px-4 py-2 rounded-lg shadow-sm bg-gray-50">
          {topic.description}
        </p>
      </div>

      {isOwner && (
        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href={`/editTopic/${topic._id}`}
            className="flex items-center py-2 px-4 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-lg"
          >
            <HiPencilAlt className="mr-2" />
            수정하기
          </Link>
          <RemoveBtn id={topic._id} />
        </div>
      )}

      {/* 모달: 이미지 클릭 시 큰 이미지 보여주기 */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={modalImage}
              alt="확대 이미지"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
