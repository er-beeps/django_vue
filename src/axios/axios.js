import axios from 'axios';

const instance = axios.create({
//   baseURL: process.env.VUE_APP_API_URL, // Make sure your API URL is defined in your environment variables
baseURL:'https://127.0.0.1:8000/api/'
});

export default instance;