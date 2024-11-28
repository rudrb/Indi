import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // FormData에서 데이터 파싱
    const formData = await request.formData()
    const title = formData.get('title')?.toString()
    const description = formData.get('description')?.toString()
    const price = formData.get('price')?.toString()
    const image = formData.get('image') as File | null

    // 유효성 검사
    if (!title || !description || !price || !image) {
      return NextResponse.json(
        { message: '상품명, 설명, 가격, 이미지는 모두 필요합니다.' },
        { status: 400 }
      )
    }

    // 가격을 숫자로 변환
    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice)) {
      return NextResponse.json(
        { message: '유효한 가격을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이미지 파일 저장
    const imagePath = path.join(process.cwd(), 'public', 'uploads', image.name)
    const buffer = await image.arrayBuffer()
    fs.writeFileSync(imagePath, Buffer.from(buffer))

    // MongoDB 연결 및 상품 데이터 저장
    await connectMongoDB()
    const newTopic = await Topic.create({
      title,
      description,
      price: parsedPrice,
      image: `/uploads/${image.name}`, // 저장된 이미지의 경로
    })

    return NextResponse.json(
      { message: 'Topic created', newTopic },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/topics', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectMongoDB()
    const topics = await Topic.find()
    return NextResponse.json({ topics })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }
    await connectMongoDB()
    const deletedTopic = await Topic.findByIdAndDelete(id)
    if (!deletedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/topics', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
