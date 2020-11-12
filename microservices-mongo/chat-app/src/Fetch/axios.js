import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000
});

axiosInstance.interceptors.request.use(request => {
  request.headers.authorization = window.sessionStorage.getItem("token");
  request.headers['Content-Type'] = 'application/json';

  return request;
});
axiosInstance.interceptors.response.use(response => {
  if(response.status === 401)
    sessionStorage.setItem('token', undefined);
  return response;
});

export default axiosInstance;