import { api } from "./Configs/axiosConfigs";
import { defineCancelApiObject } from "./Configs/axiosUtils";

export const DataProvider = {
  getList: async function (resource: string, params?: any, cancel: boolean = false) {
    const response: any = await api.request({
      url: `/${resource}`,
      method: "GET",
      params,
      signal: cancel
        ? // @ts-ignore
        cancelApiObject[this?.get?.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
  getOne: async function (resource: string, params?: any, cancel: boolean = false) {
    const { id, ...others } = params;

    const response: any = await api.request({
      url: `/${resource}/${id}`,
      method: "GET",
      params: others,
      signal: cancel
        ? // @ts-ignore
        cancelApiObject[this?.get?.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
  post: async function (resource: string, data?: any, cancel: boolean = false) {
    const response = await api.request({
      url: `/${resource}`,
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (resource: string, data: any = {}, cancel: boolean = false, token: string) {
    const { id, ...others } = data;

    const response = await api.request({
      url: `/${resource}${id ? "/" + id : ""}`,
      method: "PUT",
      data: others,
    });

    return response.data;
  },
  delete: async function (resource: string, params?: any, cancel: boolean = false) {
    const response = await api.request({
      url: `/${resource}/${params.id}`,
      method: "DELETE",
    });

    return response.data;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(DataProvider);
