import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({ baseURL: `${import.meta.env.VITE_BACKEND_URL}` });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});



// Function to create a room
export const createRoom = async (data: { name: string }) => {
  try {
    const response = await API.post('/room/create', data); // POST request to create a room
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw new Error('Failed to create room. Please try again.');
  }
};

export const logout = async () => {
  // await axios.get(`${process.env.API_BASE_URL}/user/signout`, { withCredentials: true });
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/signout`, { withCredentials: true });
  toast.success("Logged out successfully");
  localStorage.removeItem("token");
  window.location.reload();
};


