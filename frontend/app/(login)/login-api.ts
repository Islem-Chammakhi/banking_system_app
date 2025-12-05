import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (cin: string, cardNumber: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { cin, cardNumber });
    return { success: true, data: response.data };
  
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return { success: false, error: errorMessage };
  }
};