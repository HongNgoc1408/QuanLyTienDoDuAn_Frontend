import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3001/api";

export const addProfile = async (profileData) => {
  try {
    const response = await axios.post("/profile/add", profileData);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo hồ sơ:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get("/profile/getall");
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo hồ sơ:", error);
    throw error;
  }
};

export const deleteProfile = async (id) => {
  try {
    const response = await axios.delete(`/profile/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo hồ sơ:", error);
    throw error;
  }
};

