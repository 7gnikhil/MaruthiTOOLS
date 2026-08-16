const API_BASE_URL = 'https://maruthi-toolings-remastered-backend.onrender.com';

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
    console.error('Error submitting inquiry:', error);
    throw error;
  }
};
