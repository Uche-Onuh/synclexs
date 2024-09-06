import axios from "axios";

const BASE_URL = "https://snyclexs.onrender.com/api/";

export default axios.create({
  baseURL: BASE_URL,
});
