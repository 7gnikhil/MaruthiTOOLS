import mongoose, { Schema } from 'mongoose';
import { Inquiry } from '../types.js';

const inquirySchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Inquiry>('Inquiry', inquirySchema);
