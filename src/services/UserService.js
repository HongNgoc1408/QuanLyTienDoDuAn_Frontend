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

export const getUsers = async () => {
  try {
    const response = await axios.get("/user/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const getUserCount = async () => {
  try {
    const response = await axios.get("/user/count");
    return response.data;
  } catch (error) {
    console.error("Error getting user count:", error);
    throw error;
  }
};

export const checkUserExistence = async (user) => {
  try {
    const response = await axios.post("/check", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`/user/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const editUser = async (id, userData) => {
  try {
    const response = await axios.put(`/user/edit/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};
