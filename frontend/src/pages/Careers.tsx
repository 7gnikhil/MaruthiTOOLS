import React, { useState, useEffect } from 'react';
import { MOCK_CAREERS_DB } from '../api/mock-data';
import { CareerPost } from '../types';

// Falls back to relative URL (Vite proxy) when env var not set
const API_BASE: string = '';

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<CareerPost[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-gray-50 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-2">We're Hiring</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We are always looking for talented individuals to help us innovate and grow.
            Build your career in precision engineering with us.
          </p>
        </div>

        {/* Cards */}
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
                {/* Left: badge + info */}
                <div className="flex-1">
                  <span className="inline-block text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-2">
                    {job.location}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">{job.position}</h2>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">{job.description}</p>
                </div>

                {/* Right: CTA */}
                <div className="flex-shrink-0">
                  <a
                    href="mailto:marutitooling@gmail.com?subject=Application for ${job.position}"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition duration-200 text-sm whitespace-nowrap"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-14 bg-blue-600 rounded-2xl py-10 px-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">Don't see the right role?</h3>
          <p className="text-blue-100 mb-6">Send us your resume — we'd love to hear from talented people.</p>
          <a
            href="mailto:marutitooling@gmail.com"
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition"
          >
            marutitooling@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default Careers;
