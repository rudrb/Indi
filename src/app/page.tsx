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
        ></div>
      </div>

      <TopicList />
    </div>
  )
}
