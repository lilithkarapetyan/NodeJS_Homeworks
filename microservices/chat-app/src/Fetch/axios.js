import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000
});

axiosInstance.interceptors.request.use(request => {
  request.headers.token = window.sessionStorage.getItem("token");
  request.headers['Content-Type'] = 'application/json;charset=UTF-8';

  return request;
});

export default axiosInstance;