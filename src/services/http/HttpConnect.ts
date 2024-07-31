import { debouncePromise } from '@/lib/utils';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

export const configureAxiosWithToken = async (): Promise<AxiosInstance> => {
  const configAxios: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 0,
  });

  configAxios.interceptors.request.use(
    async (config) => {
      const session = await getSession();
  
      if (session?.accessToken) {
        config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }

      // Delay the request by 3 seconds, only for testing purposes
      // await debouncePromise(() => Promise.resolve(), 20000);

      return config;
    },
    (error) => Promise.reject(error)
  );

  configAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      
      switch (status) {
        case 401:
        case 403:
        case 400:
        case 404:
        case 405:
        case 500:
          console.error('HTTP Error:', error.response.data);
          break;
        case 502:
          console.error('Bad Gateway:', error.response.data);
          break;
        default:
          console.error('Unexpected Error:', error.message);
          break;
      }
      return Promise.reject(error);
    }
  );

  return configAxios;
};

export class HttpConnect {
  private static axiosInstance: AxiosInstance;

  static async getInstance(): Promise<AxiosInstance> {
    if (!this.axiosInstance) {
      this.axiosInstance = await configureAxiosWithToken();
    }
    return this.axiosInstance;
  }

  static async get(relativeUrl: string, configs?: AxiosRequestConfig): Promise<AxiosResponse> {
    const instance = await this.getInstance();
    return await instance.get(relativeUrl, configs ?? {});
  }

  static async post(relativeUrl: string, data: object, configs?: object): Promise<AxiosResponse> {
    const instance = await this.getInstance();
    return await instance.post(relativeUrl, data, configs ?? {});
  }

  static async put(relativeUrl: string, data: object, configs?: object): Promise<AxiosResponse> {
    const instance = await this.getInstance();
    return await instance.put(relativeUrl, data, configs ?? {});
  }

  static async patch(relativeUrl: string, data: object, configs?: object): Promise<AxiosResponse> {
    const instance = await this.getInstance();
    return await instance.patch(relativeUrl, data, configs ?? {});
  }

  static async delete(relativeUrl: string): Promise<AxiosResponse> {
    const instance = await this.getInstance()
    return await instance.delete(relativeUrl)
  }
}