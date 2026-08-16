import React, { useState } from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '../components/icons';
import { submitInquiry } from '../api/maruthi-toolings.api';

const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await submitInquiry(formState);
      setStatusMessage(response.message);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatusMessage('Failed to send message. Please try again later.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Get In Touch</h1>
          <p className="text-lg text-gray-600 mt-2">We'd love to hear from you. Let's build something great together.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-gray-600">Maruthi Toolings, A-42/3, Rd Number 9, IDA Kukatpally, Hyderabad, Telangana 500072</p>
              </div>
            </div>
             <div className="flex items-start">
              <EnvelopeIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">marutitooling@gmail.com</p>
              </div>
            </div>
             <div className="flex items-start">
              <PhoneIcon className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600">+91 70951 70416</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-gray-50 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                 <input type="text" name="name" placeholder="Your Name" value={formState.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                 <input type="email" name="email" placeholder="Your Email" value={formState.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
               <input type="text" name="subject" placeholder="Subject" value={formState.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              <textarea name="message" placeholder="Your Message" rows={5} value={formState.message} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required></textarea>
              <div className="text-center">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {statusMessage && <p className="mt-4 text-center text-sm">{statusMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
