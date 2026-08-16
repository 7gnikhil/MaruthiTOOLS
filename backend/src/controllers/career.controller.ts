import express from 'express';
import CareerModel from '../models/career.model.js';

/**
 * GET /api/careers — return all career listings from MongoDB
 */
export const getCareersHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const careers = await CareerModel.find().sort({ createdAt: -1 });
    res.status(200).json(careers);
  } catch (error) {
    console.error('❌ Error fetching careers:', error);
    res.status(500).json({ message: 'Error fetching careers' });
  }
};

/**
 * POST /api/careers — create a new career listing (admin use)
 */
export const createCareerHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { position, description, location } = req.body;
    if (!position || !description || !location) {
      return res.status(400).json({ message: 'position, description, and location are required.' });
    }
    const newCareer = new CareerModel({ position, description, location });
    await newCareer.save();
    res.status(201).json({ message: 'Career created successfully!', career: newCareer });
  } catch (error) {
    console.error('❌ Error creating career:', error);
    res.status(500).json({ message: 'Error creating career' });
  }
};

/**
 * DELETE /api/careers/:id — remove a career listing (admin use)
 */
export const deleteCareerHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deleted = await CareerModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Career not found.' });
    res.status(200).json({ message: 'Career deleted successfully.' });
  } catch (error) {
    console.error('❌ Error deleting career:', error);
    res.status(500).json({ message: 'Error deleting career' });
  }
};
