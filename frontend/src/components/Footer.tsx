import React, { useState } from 'react';
import { submitInquiry } from '../api/maruthi-toolings.api';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await submitInquiry({ email, message });
      setStatusMessage(response.message);
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatusMessage('Failed to send inquiry. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Map Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Location</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.336499757478!2d78.4414406!3d17.491443099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91aec172146b%3A0x497cf010c30511b4!2sMaruthi%20Toolings!5e0!3m2!1sen!2sin!4v1760279821368!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* Quick Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-gray-400">Maruthi Toolings</p>
            <p className="text-gray-400">A-42/3, Rd Number 9, IDA Kukatpally,</p>
            <p className="text-gray-400">Hyderabad, Telangana 500072</p>
            <p className="text-gray-400 mt-4">Email: marutitooling@gmail.com</p>
            <p className="text-gray-400">Phone: +91 70951 70416</p>
          </div>
          {/* Inquiry Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Inquiry</h3>
            <form onSubmit={handleInquirySubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {statusMessage && <p className="mt-2 text-center text-xs text-gray-300">{statusMessage}</p>}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>Copyright &copy; {new Date().getFullYear()} Maruthi Toolings. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
