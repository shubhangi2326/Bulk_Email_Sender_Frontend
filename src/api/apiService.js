import axios from "axios";
const apiClient = axios.create({
  baseURL:
    "https://bulk-email-sender-backend-3b8hrizzr-shubhangi2326s-projects.vercel.app/",
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
