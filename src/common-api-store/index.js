// ** Redux Imports

import axios from "axios";
import {API_URL} from "../configs/Contants";

axios.defaults.baseURL = API_URL;


export const uploadFiles = async (formData) => {
  const response = await axios.post("/api/upload-files", formData);
  return response.data;
}
