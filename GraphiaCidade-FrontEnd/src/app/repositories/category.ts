import getInstance from './instance';

const CategoryApi = {
  getReport: async (params: advancedFilterModels.CategoryAdvancedFilter) => {
    const instance = await getInstance();
    const { data } = await instance.get('/v1/category', { params });

    return data;
  },

  getDetail: async (id: string) => {
    const instance = await getInstance();
    const { data } = await instance.get(`/v1/category/${id}`);

    return data;
  },

  add: async (params: models.Category) => {
    const instance = await getInstance();
    const { data } = await instance.post('/v1/category', params);

    return data;
  },

  update: async (id: string, params: models.Category) => {
    const instance = await getInstance();
    const { data } = await instance.put(`/v1/category/${id}`, params);

    return data;
  },

  remove: async (id: string) => {
    const instance = await getInstance();
    const { data } = await instance.delete(`/v1/category/${id}`);

    return data;
  },
};

export default CategoryApi;
