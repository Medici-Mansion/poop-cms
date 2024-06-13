import { env } from 'env.mjs';
import axios, { AxiosRequestConfig } from 'axios';
import { APIResponse } from '@/types';

const version = 'v1';
const baseURL = `${env.NEXT_PUBLIC_API_URL}/api/${version}`;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// GET
export const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// POST
export const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// PUT
export const PUT = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete
export const DELETE = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
