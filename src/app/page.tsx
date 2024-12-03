import TopicList from '@/components/TopicList'

export default function Home() {
  return (
    <div>
      <div>
        {/* 배너 섹션 */}
        <div
          className="bg-gray-200 py-16"
          style={{
            backgroundImage: "url('/banner-image.jpg')", // 배경 이미지 경로
            backgroundSize: 'cover', // 이미지가 전체 배경을 덮도록 설정
            backgroundPosition: 'center', // 이미지가 중앙에 위치하도록 설정
          }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-7xl font-bold mb-4">Used market</h2>
              <p className="text-3xl text-gray-700 mb-6">
                좋은 상품을 합리적인 가격에 만나보세요!
              </p>
            </div>
          </div>
        </div>
      </div>

      <TopicList />
    </div>
  )
}
