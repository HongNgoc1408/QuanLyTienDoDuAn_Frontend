import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

export const uploadMultipleFiles = async (docsData) => {
  try {
    const response = await axios.post("/docs/uploadFiles", docsData);
    return response.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

export const getFiles = async () => {
  try {
    const response = await axios.get("/docs/files");
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

export const downloadFile = async (fileId) => {
  try {
    const response = await axios.get(`/docs/downloadFile/${fileId}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};

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

export const deleteDoc = async (id) => {
  try {
    const response = await axios.delete(`/docs/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo hồ sơ:", error);
    throw error;
  }
};
