import axios from "axios";

const BASE_URL = "https://synclexs.com/api/";

export default axios.create({
  baseURL: BASE_URL,
});
