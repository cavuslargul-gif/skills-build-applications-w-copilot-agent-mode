import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profile: {
      avatarUrl: String,
      fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model('User', userSchema)