import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

// 가능한 카테고리 값들

// POST 메서드: Topic 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() // JSON 데이터 읽기
    const { title, description, image, userEmail } = body

    // 유효성 검사
    if (!title || !description || !userEmail) {
      return NextResponse.json(
        { message: '제목, 내용 작성은 필수입니다.' },
        { status: 400 }
      )
    }

    // MongoDB 연결 및 데이터 저장
    await connectMongoDB()
    const newTopic = await Topic.create({
      title,
      description,
      image: image || null,
      userEmail,
    })

    return NextResponse.json(
      { message: 'Topic created successfully', newTopic },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/topics:', error)
    return NextResponse.json(
      { message: 'Internal server error in POST' },
      { status: 500 }
    )
  }
}

// GET 메서드: 모든 Topic 조회
export async function GET() {
  try {
    // MongoDB 연결
    await connectMongoDB()

    // 모든 Topic 조회
    const topics = await Topic.find()

    // 정상적으로 조회한 데이터를 응답
    return NextResponse.json({ topics }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/topics:', error)
    return NextResponse.json(
      { message: 'Internal server error in GET' },
      { status: 500 }
    )
  }
}
