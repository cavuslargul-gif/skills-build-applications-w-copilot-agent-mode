import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'walking', 'strength', 'cycling', 'other'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema)