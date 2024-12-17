import connectMongoDB from '@/libs/mongodb'
import TopicLists from '../components/TopicList'

export default async function Home() {
  try {
    await connectMongoDB()

    return (
      <div className="py-8 px-4">
        <div className="container mx-auto my-8 text-center">
          {/* 가운데 정렬된 TopicList */}
          <TopicLists />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          페이지 로딩 중 오류가 발생했습니다
        </h2>
        <p className="text-gray-600">잠시 후 다시 시도해주세요</p>
      </div>
    )
  }
}
