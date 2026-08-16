import mongoose, { Schema } from 'mongoose';
import { CareerPost } from '../types.js';

const careerSchema: Schema = new Schema(
  {
    position: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<CareerPost>('Career', careerSchema);
