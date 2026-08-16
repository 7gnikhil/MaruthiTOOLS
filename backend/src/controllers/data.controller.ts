import express from 'express';
import InquiryModel from '../models/inquiry.model.js';

/**
 * Handles saving contact inquiries to the MongoDB database.
 * Called when a user submits the contact form.
 */
export const createInquiryHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!email || !message) {
      return res
        .status(400)
        .json({ message: 'Email and message are required fields.' });
    }

    // Create and save inquiry in MongoDB
    const newInquiry = new InquiryModel({
      name,
      email,
      subject,
      message,
    });

    await newInquiry.save();

    // Respond success
    res
      .status(201)
      .json({ message: 'Inquiry submitted successfully!', inquiry: newInquiry });
  } catch (error) {
    console.error('❌ Error saving inquiry:', error);
    res.status(500).json({ message: 'Error submitting inquiry' });
  }
};
