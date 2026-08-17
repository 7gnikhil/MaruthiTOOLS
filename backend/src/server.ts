import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
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
    // Load local .env if present, otherwise environment variables from host (Render/Vercel)
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
    dotenv.config();

    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json({ limit: '10mb' }));

    // ── Health Check ──────────────────────────────────────────────
    app.get('/api/health', (_req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

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

    // ── Serve frontend build if exists, else API landing page ────
    const clientBuildPath = path.resolve(__dirname, '../../frontend/dist');
    if (fs.existsSync(clientBuildPath)) {
      app.use(express.static(clientBuildPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
      });
    } else {
      app.get('/', (_req, res) => {
        res.json({
          status: 'online',
          service: 'Maruthi Toolings Backend API',
          endpoints: ['/api/inquiry', '/api/applications', '/api/careers', '/api/health']
        });
      });
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
