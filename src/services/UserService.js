import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3001/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post("/user/add", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
