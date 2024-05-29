import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3001/api";

export const addProfile = async (profileData) => {
  try {
    const response = await axios.post("/profile/add", profileData);
    return response.data;
  } catch (error) {
    console.error("Error adding profile:", error);
    throw error;
  }
};
