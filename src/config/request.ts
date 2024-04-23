import axios, { AxiosInstance } from "axios";
const BASE_URL = 'https://api.themoviedb.org/3/';

export const API_KEY = import.meta.env.VITE_APP_TITLE 


const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default request;
