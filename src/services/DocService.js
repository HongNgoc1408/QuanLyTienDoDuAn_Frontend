import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3001/api";

export const uploadMultipleFiles = async (docsData) => {
  try {
    const response = await axios.post("/docs/uploadFiles", docsData);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo hồ sơ:", error);
    throw error;
  }
};

// export const getProfile = async () => {
//   try {
//     const response = await axios.get("/docs/getall");
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi tạo hồ sơ:", error);
//     throw error;
//   }
// };

// export const getProfileById = async (id) => {
//   try {
//     const response = await axios.get(`/docs/get/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi tạo hồ sơ:", error);
//     throw error;
//   }
// };

// export const editProfile = async (id, docsData) => {
//   try {
//     const response = await axios.put(`/docs/edit/${id}`, docsData);
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi tạo hồ sơ:", error);
//     throw error;
//   }
// };

// export const deleteProfile = async (id) => {
//   try {
//     const response = await axios.delete(`/docs/delete/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi tạo hồ sơ:", error);
//     throw error;
//   }
// };
