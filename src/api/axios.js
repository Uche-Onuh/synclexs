import axios from "axios";

const BASE_URL = "http://192.168.18.13:8000";

export default axios.create({
  baseURL: BASE_URL,
});
