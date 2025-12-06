import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true, });
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error; 
  }
};
