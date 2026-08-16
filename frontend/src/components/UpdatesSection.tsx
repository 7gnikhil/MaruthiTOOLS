import React from 'react';
import { Update } from '../types';
import { MOCK_UPDATES_DB } from '../api/mock-data';

const UpdatesSection: React.FC = () => {
  const updates: Update[] = MOCK_UPDATES_DB;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Latest Updates</h2>
            <p className="text-gray-600 mt-2">News from our workshop and company.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {updates.map((update, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-sm text-gray-500 mb-2">{new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">{update.title}</h3>
            <p className="text-gray-700">{update.description}</p>
            </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
