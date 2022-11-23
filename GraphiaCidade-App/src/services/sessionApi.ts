import axios from 'axios';
import { API_SESSION_BASE_URL } from './env';

const sessionApi = axios.create({
  baseURL: API_SESSION_BASE_URL,
});

export default sessionApi;
