// ** Redux Imports

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3500";


export const uploadFiles = async (formData) => {
  const response = await axios.post("/api/upload-files", formData);
  return response.data;
}
