import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema)