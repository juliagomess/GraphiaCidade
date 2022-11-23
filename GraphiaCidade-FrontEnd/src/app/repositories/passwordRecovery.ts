import { API_URL } from '@portal/config/env';

import getInstance from './instance';

const PasswordRecoveryApi = {
  sendVerification: async (email: string) => {
    const instance = getInstance();
    const { data } = await instance.post(`${API_URL}/user/password-recovery`, {
      email,
      sendTo: 'email',
    });

    return data;
  },

  putRecovery: async (params: models.ResetPassword) => {
    const instance = getInstance();
    const { data } = await instance.put(`${API_URL}/user/password-recovery`, params);

    return data;
  },
};

export default PasswordRecoveryApi;
