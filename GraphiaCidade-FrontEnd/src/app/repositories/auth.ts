import { encodeBase64 } from '~/utils/utilities';

import getInstance from './instance';

const AuthApi = {
  login: async ({ username, password }: models.AuthRequest) => {
    const instance = getInstance(encodeBase64(`${username}:${password}`));
    const { data } = await instance.get('/v1/login/signin');

    return data;
  },

  refreshToken: async (user: any) => {
    const instance = getInstance();

    const { data } = await instance.get('/v1/login/refresh');

    return data;
  },

  changePassword: async (params: models.ChangePassword) => {
    const instance = getInstance();
    const { data } = await instance.post('/v1/login/chpass', params);

    return data;
  }
};

export default AuthApi;
