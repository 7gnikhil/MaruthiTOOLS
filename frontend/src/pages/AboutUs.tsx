import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">About Maruthi Toolings</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Building a legacy of precision in plastic injection mould manufacturing for over 9 years.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img 
              src="https://thumbs.dreamstime.com/b/injection-molding-biomedical-products-clean-room-moulding-large-cleanroom-cleanroom-environment-typically-48273880.jpg?w=768" 
              alt="Intricate injection mould detail showcasing precision engineering"
              className="rounded-lg shadow-xl"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                To deliver superior plastic injection moulding solutions through dedicated craftsmanship, technical expertise, and a client-first approach. We empower our partners to achieve their manufacturing goals with reliable, high-performance tooling.
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To be the most trusted partner for complex and critical injection moulds in the automotive, pharmaceutical, and consumer goods industries, known for our unwavering commitment to quality and innovation.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Expertise</h3>
                <p className="text-gray-600">8+ years of hands-on experience and a dedicated, highly skilled team.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Technology</h3>
                <p className="text-gray-600">Our workshop is equipped with multi-axis CNC milling centers and high-precision EDM machines for ultimate precision.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Commitment to Quality</h3>
                <p className="text-gray-600">Rigorous in-house checks and dimensional analysis on every component.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
