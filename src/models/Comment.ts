// src/models/Comment.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IComment extends Document {
  content: string
  author: string
  createdAt: Date
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

export default Comment
