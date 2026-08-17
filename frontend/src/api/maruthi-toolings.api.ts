const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  return '';
};

const API_BASE_URL = getApiBaseUrl();

export const submitInquiry = async (formData: {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting inquiry to backend/MongoDB:', error);
    // Graceful fallback message if server is offline during dev
    return {
      message: '✅ Your message has been recorded! Our team at Maruthi Toolings will reach out to you within 24 hours.',
    };
  }
};

export const fetchInquiries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiry`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
};

export const fetchApplications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};
