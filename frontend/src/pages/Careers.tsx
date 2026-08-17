import React, { useState, useEffect } from 'react';
import { MOCK_CAREERS_DB } from '../api/mock-data';
import { CareerPost } from '../types';
import JobApplicationModal from '../components/JobApplicationModal';

const API_BASE: string = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<CareerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyJobTitle, setApplyJobTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/careers`);
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        setCareers(data.length ? data : MOCK_CAREERS_DB);
      } catch {
        // Fallback to mock data if backend is not running
        setCareers(MOCK_CAREERS_DB);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-20 md:py-28">
        <div className="container mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-2">We're Hiring</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Our Precision Team</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We are always looking for talented CNC operators, mould designers, and engineers.
              Build your career in precision plastic injection tooling with us.
            </p>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-5">
              {careers.map((job, index) => (
                <div
                  key={job._id || index}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  {/* Info */}
                  <div className="flex-1">
                    <span className="inline-block text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-2">
                      📍 {job.location}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">{job.position}</h2>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">{job.description}</p>
                  </div>

                  {/* CTA Apply */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setApplyJobTitle(job.position)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200 text-sm whitespace-nowrap shadow-md shadow-blue-600/20"
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer General Application CTA */}
          <div className="text-center mt-14 bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl py-10 px-6 max-w-4xl mx-auto shadow-xl text-white">
            <h3 className="text-2xl font-bold mb-2">Don't see the right role?</h3>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto text-sm">
              Send us your application details — we are always looking for passionate tooling experts.
            </p>
            <button
              onClick={() => setApplyJobTitle('General Tooling Engineer / General Position')}
              className="bg-white text-blue-800 font-bold py-3.5 px-8 rounded-xl hover:bg-blue-50 transition shadow-lg text-sm"
            >
              Submit General Application
            </button>
          </div>

        </div>
      </div>

      {/* Application Form Modal */}
      {applyJobTitle && (
        <JobApplicationModal
          positionTitle={applyJobTitle}
          onClose={() => setApplyJobTitle(null)}
        />
      )}
    </>
  );
};

export default Careers;
