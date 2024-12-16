// src/models/Favorite.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IFavorite extends Document {
  userId: string
  postId: string
}

const FavoriteSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    postId: { type: String, required: true },
  },
  { timestamps: true }
)

const Favorite =
  mongoose.models.Favorite ||
  mongoose.model<IFavorite>('Favorite', FavoriteSchema)

export default Favorite
