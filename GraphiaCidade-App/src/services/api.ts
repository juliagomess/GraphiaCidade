/* eslint-disable no-param-reassign */
import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import { API_BASE_URL } from './env';

axios.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('@userToken');

    config.baseURL = API_BASE_URL;

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  async error => {
    Alert.alert(
      'Alerta',
      'Estamos com problemas de comunicação, verifique sua internet.',
    );
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status >= 500) {
      Alert.alert(
        'Alerta',
        'Estamos com problemas de comunicação, verifique sua internet.',
      );
    }
    return Promise.reject(error);
  },
);

export default axios;
