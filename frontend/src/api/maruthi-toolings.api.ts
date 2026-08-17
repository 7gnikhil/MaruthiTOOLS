export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
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
      throw new Error(`Server error (${response.status}): Failed to save inquiry to MongoDB`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error submitting inquiry to backend/MongoDB:', error);
    throw error;
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
