import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    //Add condition that have to be fulfilled in order to proceed with a request

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error && error.response && error.response.status === 401) {
      console.log(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
