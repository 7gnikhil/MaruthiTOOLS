import express from 'express';
import InquiryModel from '../models/inquiry.model.js';
import ApplicationModel from '../models/application.model.js';

// Input sanitization helper
const sanitize = (text: string) => {
  if (!text) return '';
  return String(text).replace(/<[^>]*>?/gm, '').trim();
};

/**
 * Save contact inquiry to MongoDB
 */
export const createInquiryHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, subject, message } = req.body;

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

    if (!cleanEmail || !cleanMessage) {
      return res.status(400).json({ message: 'Email and message are required.' });
    }

    const newInquiry = new InquiryModel({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    await newInquiry.save();

    console.log(`📩 New Contact Message Saved to MongoDB: ${cleanEmail}`);

    res.status(201).json({
      message: 'Inquiry submitted successfully! We will contact you soon.',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error('❌ Error saving inquiry:', error);
    res.status(500).json({ message: 'Error submitting inquiry' });
  }
};

/**
 * Fetch all contact inquiries from MongoDB for company access
 */
export const getInquiriesHandler = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const inquiries = await InquiryModel.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('❌ Error fetching inquiries:', error);
    res.status(500).json({ message: 'Error fetching inquiries' });
  }
};

/**
 * Save career job application to MongoDB
 */
export const createApplicationHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { position, name, email, phone, qualification, languages, experience, resumeName } = req.body;

    const cleanPosition = sanitize(position);
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanQualification = sanitize(qualification);
    const cleanLanguages = sanitize(languages);
    const cleanExperience = sanitize(experience);

    if (!cleanPosition || !cleanName || !cleanEmail || !cleanPhone || !cleanQualification) {
      return res.status(400).json({ message: 'All required application fields must be provided.' });
    }

    const newApplication = new ApplicationModel({
      position: cleanPosition,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      qualification: cleanQualification,
      languages: cleanLanguages,
      experience: cleanExperience,
      resumeName: resumeName || 'resume.pdf',
    });

    await newApplication.save();

    console.log(`💼 New Job Application Saved to MongoDB: ${cleanName} for ${cleanPosition}`);

    res.status(201).json({
      message: 'Job application submitted successfully!',
      application: newApplication,
    });
  } catch (error) {
    console.error('❌ Error saving application:', error);
    res.status(500).json({ message: 'Error submitting job application' });
  }
};

/**
 * Fetch all job applications from MongoDB for company access
 */
export const getApplicationsHandler = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const applications = await ApplicationModel.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};
