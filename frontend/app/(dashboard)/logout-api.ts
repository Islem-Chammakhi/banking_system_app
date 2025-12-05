import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};