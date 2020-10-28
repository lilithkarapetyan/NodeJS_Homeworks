import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://picsart-bootcamp-2020-api.herokuapp.com/api',
  timeout: 10000
});

axiosInstance.interceptors.request.use(request => {
  request.headers.token = window.sessionStorage.getItem("token");

  return request;
});

export default axiosInstance;