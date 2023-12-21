import { api } from './Configs/axiosConfigs';
import { defineCancelApiObject } from './Configs/axiosUtils';

export const DataProvider = {
  async getList(resource: string, params?: any, cancel = false) {
    const response: any = await api.request({
      url: `/${resource}`,
      method: 'GET',
      params,
    });

    return response.data;
  },
  async getOne(resource: string, params?: any, cancel = false) {
    const { id, ...others } = params;

    const response: any = await api.request({
      url: `/${resource}/${id}`,
      method: 'GET',
      params: others,
    });

    return response.data;
  },
  async post(resource: string, data?: any) {
    const response = await api.request({
      url: `/${resource}`,
      method: 'POST',
      data,
    });

    return response.data;
  },
  async update(resource: string, data: any = {}) {
    const { id, ...others } = data;

    const response = await api.request({
      url: `/${resource}${id ? `/${id}` : ''}`,
      method: 'PUT',
      data: others,
    });

    return response.data;
  },
  async delete(resource: string, params?: any) {
    const response = await api.request({
      url: `/${resource}/${params.id}`,
      method: 'DELETE',
    });

    return response.data;
  },
};
