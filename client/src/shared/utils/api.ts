import axios from "axios";


const Api = axios.create({
  baseURL: `https://nebsittask.onrender.com/api/v1`,
});

export default Api;
