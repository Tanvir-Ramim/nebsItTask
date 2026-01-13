import axios from "axios";


const Api = axios.create({
  // baseURL: `http://localhost:5000/api/v1`,
   baseURL: `https://nebsittask.onrender.com/api/v1`,
});

export default Api;
