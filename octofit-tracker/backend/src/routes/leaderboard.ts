import { Router } from 'express'
import Leaderboard from '../models/Leaderboard.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('userId').sort({ points: -1, rank: 1 }))
})

router.post('/', async (request, response) => {
  const entry = await Leaderboard.create(request.body)
  response.status(201).json(entry)
})

export default router