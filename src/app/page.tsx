import TopicList from '@/components/TopicList'
import connectMongoDB from '@/libs/mongodb'

export default async function Home() {
  try {
    await connectMongoDB()

    return (
      <div>
        {/* 배너 섹션 */}
        <div className="relative h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/IMG.gif')",
              filter: 'sepia(20%)',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-[#D4AF37] text-6xl mb-6 font-['Dancing_Script']">
                  <a
                    href="https://finalteam.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://finalteam.vercel.app/
                  </a>
                </h1>
                <p className="text-[#D2B48C] text-xl mb-8 font-light tracking-wide">
                  팀 프로젝트 홈페이지
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto my-8 text-center">
          {/* 가운데 정렬된 TopicList */}
          <TopicList />
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
