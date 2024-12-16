import mongoose, { Schema, Document } from 'mongoose'

interface ITopic extends Document {
  title: string
  description: string
  image: string
  userEmail: string
}

const TopicSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' }, // 기본값 추가
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
)

// Check if the model is already defined
const Topic =
  mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema)

export default Topic
