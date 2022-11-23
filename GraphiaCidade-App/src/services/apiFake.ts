import axios from 'axios';
import { API_FAKE_BASE_URL } from './env';

const fakeApi = axios.create({
  baseURL: API_FAKE_BASE_URL,
});

export default fakeApi;
