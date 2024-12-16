'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiPaperclip } from 'react-icons/fi' // 클립 아이콘 추가

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  image?: string
  price: number
  category: string
}

export default function TopicLists() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 4

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics')
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()
        setTopics(data.topics)
      } catch (error) {
        console.error('Error loading topics: ', error)
        setError('Failed to load topics')
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [])

  const totalItems = topics.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTopics = topics.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const convertToLinks = (text: string) => {
    const urlRegex =
      /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?/g

    return text.split(urlRegex).map((part, index) => {
      // part가 유효한 값인지 확인
      if (part && part.match(urlRegex)) {
        // 만약 http:// 또는 https:// 가 없다면 자동으로 https://를 붙임
        const fullUrl =
          part.startsWith('http://') || part.startsWith('https://')
            ? part
            : `https://${part}`
        return (
          <a
            key={index}
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part // URL이 아니면 그대로 반환
    })
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Image
          src="/load.gif"
          alt="Loading animation"
          width={200}
          height={200}
        />
      </div>
    )
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto my-8 px-4 relative">
      {/* 클립 아이콘 */}
      <div className="absolute top-4 left-4 text-3xl text-gray-600">
        <FiPaperclip />
      </div>
      {paginatedTopics.length === 0 ? (
        <p className="text-gray-500 mt-4">게시물이 없습니다...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedTopics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6"
            >
              <div className="relative h-48 w-full mb-6 rounded-md overflow-hidden">
                <Image
                  src={topic.image || '/123.gif'}
                  alt={topic.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 truncate">
                {convertToLinks(topic.description)}
              </p>
              <p className="text-xs text-gray-900 mt-2">{topic.category}</p>
              <p className="text-xs text-gray-900 mt-1">
                만든 시간: {new Date(topic.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-900 mt-1">
                업데이트 시간: {new Date(topic.updatedAt).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-gray-800"></span>
                <Link href={`/detailTopic/${topic._id}`} passHref>
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-500 transition">
                    게시물 보기
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 페이지네이션 UI */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
