import axios from "axios"

const options = {
    baseURL: 'http://localhost:8000',
    withCredentials: true
}
const API = axios.create(options)

API.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

export default API