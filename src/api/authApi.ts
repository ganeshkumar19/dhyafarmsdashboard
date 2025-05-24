import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/identity/auth/login`, {
      username: email,
      password: password,
    });
    return response.data; // Returning API response
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
