import { NextRequest, NextResponse } from 'next/server'
import Topic from '@/models/topic'
import connectMongoDB from '@/libs/mongodb'
import fs from 'fs'
import path from 'path'

export const GET = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const topic = await Topic.findById(params.id)
    if (!topic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    return NextResponse.json(topic) // 상품 정보를 JSON으로 반환
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: '상품 정보 조회 중 오류 발생' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    // JSON 데이터 읽기
    const body = await req.json()
    const { title, description, image } = body

    // 유효성 검사
    if (!title || !description) {
      return NextResponse.json(
        { message: '모든 필드를 채워주세요.' },
        { status: 400 }
      )
    }

    // MongoDB 연결
    await connectMongoDB()

    // 이전 Topic 가져오기 (이미지 처리용)
    const topic = await Topic.findById(id)
    if (!topic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 이미지 파일 삭제 처리 (이미지 업데이트 시)
    if (image && topic.image !== image) {
      // 이전 이미지 파일 삭제
      const oldImagePath = path.join(
        process.cwd(),
        'public',
        topic.image.replace('/uploads/', '')
      )
      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath) // 비동기 파일 삭제
      }
    }

    // 데이터 업데이트
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true } // 업데이트된 데이터를 반환
    )

    if (!updatedTopic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: '상품이 성공적으로 수정되었습니다.', updatedTopic },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating topic:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // 상품 조회
    const topic = await Topic.findById(params.id)
    if (!topic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 이미지 파일 삭제 (이미지 경로가 있을 경우)
    if (topic.image) {
      const imagePath = path.join(
        process.cwd(),
        'public',
        topic.image.replace('/uploads/', '')
      )
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath) // 비동기 파일 삭제
      }
    }

    // 상품 삭제
    await Topic.findByIdAndDelete(params.id)

    return NextResponse.json(
      { message: '상품이 삭제되었습니다.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('상품 삭제 중 오류 발생:', error)
    return NextResponse.json(
      { message: '상품 삭제 중 오류 발생' },
      { status: 500 }
    )
  }
}
