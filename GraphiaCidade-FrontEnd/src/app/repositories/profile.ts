import getInstance from './instance';

const ProfileApi = {
  getReport: async (params: advancedFilterModels.ProfileAdvancedFilter) => {
    const instance = await getInstance();
    const { data } = await instance.get('/v1/profile', { params });

    return data;
  },

  getDetail: async (id: string) => {
    const instance = await getInstance();
    const { data } = await instance.get(`/v1/profile/${id}`);

    return data;
  },

  add: async (params: models.Profile) => {
    const instance = await getInstance();
    const { data } = await instance.post('/v1/profile', params);

    return data;
  },

  update: async (id: string, params: models.Profile) => {
    const instance = await getInstance();
    const { data } = await instance.put(`/v1/profile/${id}`, params);

    return data;
  },

  remove: async (id: string) => {
    const instance = await getInstance();
    const { data } = await instance.delete(`/v1/profile/${id}`);

    return data;
  },
};

export default ProfileApi;
