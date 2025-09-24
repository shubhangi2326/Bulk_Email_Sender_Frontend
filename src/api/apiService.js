import axios from "axios";
const apiClient = axios.create({
 
  baseURL: "http://localhost:5000",
});

export const uploadAndSendFile = async (formData) => {
  try {
    const response = await apiClient.post("/api/upload-and-send", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Network or Server Error");
  }
};
