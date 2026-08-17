import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  position: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  languages: string;
  experience: string;
  resumeName?: string;
  createdAt: Date;
}

const applicationSchema: Schema = new Schema({
  position: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  languages: { type: String, required: true },
  experience: { type: String, required: true },
  resumeName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IApplication>('Application', applicationSchema);
