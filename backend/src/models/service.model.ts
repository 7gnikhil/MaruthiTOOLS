import mongoose, { Schema } from 'mongoose';
import { Service } from '../types.js';

const serviceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export default mongoose.model<Service>('Service', serviceSchema);
