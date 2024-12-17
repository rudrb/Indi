'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
  const itemsPerPage = 15

  const [currentSlide, setCurrentSlide] = useState(0)

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

    // 5초마다 데이터 갱신
    const intervalId = setInterval(() => {
      fetchTopics()
    }, 5000)

    // 컴포넌트 언마운트 시 인터벌 클리어
    return () => clearInterval(intervalId)
  }, [])

  const totalItems = topics.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTopics = topics.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setCurrentSlide(0) // 슬라이드를 리셋
  }

  const handleNextSlide = () => {
    if (currentSlide < paginatedTopics.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const convertToLinks = (text: string) => {
    const urlRegex =
      /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?/g

    return text.split(urlRegex).map((part, index) => {
      if (part && part.match(urlRegex)) {
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
      return part
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
    <div className="container mx-auto my-8 px-4 relative max-w-7xl">
      <div className="absolute top-4 left-4 text-3xl text-gray-600"></div>
      {paginatedTopics.length === 0 ? (
        <p className="text-gray-500 mt-4">게시물이 없습니다...</p>
      ) : (
        <div className="relative max-w-4xl mx-auto">
          {/* 슬라이드 부분 */}
          <div className="relative flex items-center justify-center">
            {paginatedTopics.map((topic, index) => {
              // 비스듬히 보이는 게시물에 대한 스타일
              const isActive = index === currentSlide
              const isPrev = index === currentSlide - 1
              const isNext = index === currentSlide + 1

              return (
                <div
                  key={topic._id}
                  className={`absolute transition-all ease-in-out duration-300 ${
                    isActive
                      ? 'z-10 scale-100 opacity-100' // 중앙에 있을 때
                      : isPrev || isNext
                      ? 'z-0 scale-90 opacity-50' // 양옆에 있을 때
                      : 'z-0 scale-80 opacity-30' // 뒤에 있을 때
                  }`}
                  style={{
                    // 위치를 중앙으로 고정
                    transform: isPrev
                      ? 'translateX(-50%) rotate(-10deg)' // 왼쪽에 비스듬히
                      : isNext
                      ? 'translateX(50%) rotate(10deg)' // 오른쪽에 비스듬히
                      : 'translateX(0)', // 중앙은 기본
                    transformOrigin: 'center',
                    width: '40%', // 크기를 줄여서 비스듬히 보이게
                    top: '0', // 이미지가 위로 밀리지 않도록 고정
                  }}
                >
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-8">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden">
                          <Image
                            src={topic.image || '/123.gif'}
                            alt={topic.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          {convertToLinks(topic.description)}
                        </p>

                        <p className="text-xs text-gray-500">
                          만든 시간:{' '}
                          {new Date(topic.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Link href={`/detailTopic/${topic._id}`}>
                          <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500 text-xs transition">
                            게시물 보기
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 슬라이드 전환 버튼 */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-gray-600 cursor-pointer bg-white rounded-full p-2 shadow hover:bg-gray-200"
            onClick={handlePrevSlide}
          >
            &#8592;
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl text-gray-600 cursor-pointer bg-white rounded-full p-2 shadow hover:bg-gray-200"
            onClick={handleNextSlide}
          >
            &#8594;
          </button>

          {/* 페이지네이션 버튼 추가 */}
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700'
                } hover:bg-blue-500 hover:text-white`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
