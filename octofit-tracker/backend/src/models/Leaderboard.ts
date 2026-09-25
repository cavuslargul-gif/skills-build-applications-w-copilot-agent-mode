import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
)

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)