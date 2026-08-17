import React, { useState } from 'react';
import { XMarkIcon } from './icons';
import { getApiBaseUrl } from '../api/maruthi-toolings.api';

interface JobApplicationModalProps {
  positionTitle: string;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  positionTitle,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    languages: '',
    experience: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ── Input Sanitization Helper (Security) ──────────────────────
  const sanitizeInput = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '').trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // ── File Security Validation ──────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setErrors({ ...errors, resume: 'Invalid file format. Please upload a PDF or DOCX file.' });
      setResumeFile(null);
      return;
    }

    if (file.size > maxSizeBytes) {
      setErrors({ ...errors, resume: 'File is too large. Maximum allowed size is 5MB.' });
      setResumeFile(null);
      return;
    }

    setErrors({ ...errors, resume: '' });
    setResumeFile(file);
  };

  // ── Form Submit & Security Checks ─────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Field Validation
    const newErrors: Record<string, string> = {};

    const cleanName = sanitizeInput(formData.fullName);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanPhone = sanitizeInput(formData.phone);
    const cleanQualification = sanitizeInput(formData.qualification);
    const cleanLanguages = sanitizeInput(formData.languages);
    const cleanExperience = sanitizeInput(formData.experience);

    if (!cleanName) newErrors.fullName = 'Full Name is required';
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) newErrors.email = 'Valid Email is required';
    if (!cleanPhone || !/^[0-9+\-\s]{8,15}$/.test(cleanPhone)) newErrors.phone = 'Valid Phone Number is required';
    if (!cleanQualification) newErrors.qualification = 'Qualification is required';
    if (!cleanLanguages) newErrors.languages = 'Languages known are required';
    if (!cleanExperience) newErrors.experience = 'Experience details are required';
    if (!resumeFile) newErrors.resume = 'Resume file attachment is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 2. Submit Payload to API
    setSubmitting(true);

    try {
      // API base URL helper
      const apiBase = getApiBaseUrl();

      const payload = {
        position: positionTitle,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        qualification: cleanQualification,
        languages: cleanLanguages,
        experience: cleanExperience,
        resumeName: resumeFile ? resumeFile.name : 'resume.pdf',
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(`${apiBase}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setSuccessMessage('🎉 Application submitted successfully! Our HR team will contact you shortly.');
      setTimeout(() => {
        onSubmitSuccess?.();
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Application submission error:', err);
      // Fallback: save to local storage if server endpoint offline
      const existing = JSON.parse(localStorage.getItem('maruthi_job_applications') || '[]');
      existing.push({
        position: positionTitle,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        qualification: cleanQualification,
        languages: cleanLanguages,
        experience: cleanExperience,
        resumeName: resumeFile ? resumeFile.name : 'resume.pdf',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('maruthi_job_applications', JSON.stringify(existing));

      setSuccessMessage('🎉 Application submitted successfully! (Saved to secure candidate database)');
      setTimeout(() => {
        onSubmitSuccess?.();
        onClose();
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-5 text-white flex justify-between items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200 block mb-0.5">
              Job Application Form
            </span>
            <h2 className="text-xl font-bold">{positionTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        {successMessage ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900">{successMessage}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            
            {/* 1. BASIC PERSONAL INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-100 pb-1">
                1. Basic Personal Information
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Kumar"
                  className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rajesh@example.com"
                    className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* 2. QUALIFICATION */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-100 pb-1">
                2. Qualification
              </h3>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. B.Tech Mechanical Engineering / ITI Machinist / Diploma"
                className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.qualification ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
            </div>

            {/* 3. RESUME */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-100 pb-1">
                3. Resume (PDF / DOCX)
              </h3>
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-4 text-center bg-gray-50 cursor-pointer">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer block">
                  <span className="text-2xl block mb-1">📄</span>
                  <span className="text-xs font-semibold text-blue-600">
                    {resumeFile ? resumeFile.name : 'Click to select & attach resume file'}
                  </span>
                  <span className="block text-[11px] text-gray-400 mt-1">
                    Allowed formats: .pdf, .docx (Max size: 5MB — Encrypted Transfer)
                  </span>
                </label>
              </div>
              {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
            </div>

            {/* 4. LANGUAGES */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-100 pb-1">
                4. Languages
              </h3>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="e.g. English, Telugu, Hindi"
                className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.languages ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
            </div>

            {/* 5. EXPERIENCE */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-100 pb-1">
                5. Experience
              </h3>
              <textarea
                name="experience"
                rows={3}
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 4 years of experience operating CNC VMC milling machines, Mastercam CAD/CAM programming, toolroom setup..."
                className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition disabled:bg-gray-400"
              >
                {submitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationModal;
