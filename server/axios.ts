import { env } from 'env.mjs';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { APIResponse } from '@/types';

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
    if (error instanceof Error) throw error;
    else throw new Error('An unknown error occurred');
  }
};

// POST
export const POST = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    else throw new Error('An unknown error occurred');
  }
};

// PUT
export const PUT = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error('An unknown error occurred');
  }
};

// DELETE
export const DELETE = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error('An unknown error occurred');
  }
};
