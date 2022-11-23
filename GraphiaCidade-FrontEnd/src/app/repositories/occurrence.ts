import getInstance from './instance';

const OccurrenceApi = {
  getReport: async (params: advancedFilterModels.OccurrenceAdvancedFilter) => {
    const instance = await getInstance();
    const { data } = await instance.get('/v1/reports', { params });

    return data;
  },

  getDetail: async (id: string) => {
    const instance = await getInstance();
    const { data } = await instance.get(`/v1/reports/${id}`);

    return data;
  },

  export: async (params?: advancedFilterModels.OccurrenceAdvancedFilter) => {
    const instance = await getInstance();
    const { data } = await instance.get(`/v1/reports-csv`, { params });

    return data;
  },

  add: async (params: models.Occurrence) => {
    const instance = await getInstance();
    const { data } = await instance.post('/v1/reports', params);

    return data;
  },

  update: async (id: string, params: models.Occurrence) => {
    const instance = await getInstance();
    const { data } = await instance.put(`/v1/reports/${id}`, params);

    return data;
  },

  remove: async (id: string) => {
    const instance = await getInstance();
    const { data } = await instance.delete(`/v1/reports/${id}`);

    return data;
  },
};

export default OccurrenceApi;
