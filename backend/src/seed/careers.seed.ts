/**
 * Seed script – run once to populate MongoDB with career listings.
 * Usage: cd backend && npx ts-node --esm src/seed/careers.seed.ts
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import CareerModel from '../models/career.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const careers = [
  {
    position: 'CNC Operator',
    description: 'We are looking for an experienced CNC Operator.',
    location: 'Hyderabad, India',
  },
  {
    position: 'Mould Designer',
    description: 'Seeking a creative and technical Mould Designer with 5+ years of experience in SolidWorks or a similar CAD program for complex injection moulds.',
    location: 'Hyderabad, India',
  },
  {
    position: 'CNC Operator Trainee',
    description: 'Looking for a fresher to work as a CNC Operator Trainee.',
    location: 'Hyderabad, India',
  },
  {
    position: 'Designer Trainee',
    description: 'Looking for a fresher to work as a Designer Trainee.',
    location: 'Hyderabad, India',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error('MONGODB_URI not set in .env');

  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  // Clear existing and insert fresh
  await CareerModel.deleteMany({});
  const inserted = await CareerModel.insertMany(careers);
  console.log(`✅ Seeded ${inserted.length} career listings`);

  await mongoose.disconnect();
  console.log('✅ Done');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
