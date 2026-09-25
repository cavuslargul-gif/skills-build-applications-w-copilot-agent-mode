import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        profile: { fitnessLevel: 'intermediate', avatarUrl: '/avatars/maya.png' },
      },
      {
        name: 'Jordan Williams',
        email: 'jordan.williams@example.com',
        profile: { fitnessLevel: 'advanced', avatarUrl: '/avatars/jordan.png' },
      },
      {
        name: 'Sofia Martinez',
        email: 'sofia.martinez@example.com',
        profile: { fitnessLevel: 'beginner', avatarUrl: '/avatars/sofia.png' },
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@example.com',
        profile: { fitnessLevel: 'intermediate', avatarUrl: '/avatars/ethan.png' },
      },
    ]);

    await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A steady-paced team focused on building endurance together.',
        members: [users[0]._id, users[1]._id],
        points: 430,
      },
      {
        name: 'Campus Climbers',
        description: 'A balanced team mixing strength, mobility, and outdoor activity.',
        members: [users[2]._id, users[3]._id],
        points: 315,
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 32,
        distanceKm: 5.1,
        points: 82,
        loggedAt: new Date('2026-09-22T16:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        durationMinutes: 48,
        distanceKm: 14.8,
        points: 124,
        loggedAt: new Date('2026-09-23T17:15:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'walking',
        durationMinutes: 35,
        distanceKm: 2.7,
        points: 48,
        loggedAt: new Date('2026-09-24T15:45:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'strength',
        durationMinutes: 40,
        points: 96,
        loggedAt: new Date('2026-09-24T18:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[1]._id, points: 124, rank: 1, period: 'weekly' },
      { userId: users[3]._id, points: 96, rank: 2, period: 'weekly' },
      { userId: users[0]._id, points: 82, rank: 3, period: 'weekly' },
      { userId: users[2]._id, points: 48, rank: 4, period: 'weekly' },
    ]);

    await Workout.insertMany([
      {
        title: 'Lunch Break 5K Builder',
        description: 'A progressive run and walk session for improving steady-state endurance.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        category: 'cardio',
      },
      {
        title: 'Strong Foundations',
        description: 'A full-body strength circuit using bodyweight movements and controlled tempo.',
        difficulty: 'beginner',
        durationMinutes: 25,
        category: 'strength',
      },
      {
        title: 'Athlete Power Circuit',
        description: 'A challenging circuit combining lower-body power, core stability, and mobility.',
        difficulty: 'advanced',
        durationMinutes: 45,
        category: 'performance',
      },
    ]);

    console.log('Seeded 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
