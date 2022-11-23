import getInstance from './instance';

const MapApi = {
  getMarkers: async (params?: advancedFilterModels.MapAdvancedFilter) => {
    const instance = await getInstance();
    const { data } = await instance.get('/v1/map', { params });

    return data;
  },

};

export default MapApi;
