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

export const getProgresses = async () => {
  try {
    const response = await axios.get("/progress/getall");
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const getProgressById = async (id) => {
  try {
    const response = await axios.get(`/progress/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const editProgress = async (id, progressData) => {
  try {
    const response = await axios.put(`/progress/edit/${id}`, progressData);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const deleteProgress = async (id) => {
  try {
    const response = await axios.delete(`/progress/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo dự án:", error);
    throw error;
  }
};

export const getProgressByUser = async (userId) => {
  try {
    const response = await axios.get(`/progress/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Lỗi lấy danh sách dự án cho người dùng có ID ${userId}:`,
      error
    );
    throw error;
  }
};
