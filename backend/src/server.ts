import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import process from 'process';
import {
  createInquiryHandler,
  getInquiriesHandler,
  createApplicationHandler,
  getApplicationsHandler,
} from './controllers/data.controller.js';
import { getCareersHandler, createCareerHandler, deleteCareerHandler } from './controllers/career.controller.js';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
  try {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });

    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json({ limit: '10mb' }));

    // ── Inquiry / Contact Messages (MongoDB) ──────────────────────
    app.post('/api/inquiry', createInquiryHandler);
    app.get('/api/inquiry', getInquiriesHandler);

    // ── Career Applications (MongoDB) ─────────────────────────────
    app.post('/api/applications', createApplicationHandler);
    app.get('/api/applications', getApplicationsHandler);

    // ── Careers Job Listings ──────────────────────────────────────
    app.get('/api/careers', getCareersHandler);
    app.post('/api/careers', createCareerHandler);
    app.delete('/api/careers/:id', deleteCareerHandler);

    // ── Serve frontend build (production) ─────────────────────────
    const clientBuildPath = path.resolve(__dirname, '../../frontend/dist');
    app.use(express.static(clientBuildPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🔗 Contact Inquiries: http://localhost:${PORT}/api/inquiry`);
      console.log(`💼 Job Applications: http://localhost:${PORT}/api/applications`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
