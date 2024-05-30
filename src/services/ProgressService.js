import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3001/api";

export const addProgress = async (progressData) => {
  try {
    const response = await axios.post("/progress/add", progressData);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};
