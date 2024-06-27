import { GET, PUT } from '@/server/axios';
import type { BreedList, Graphic, QueryParams } from '@/types';

export const getBreeds = async () => {
  try {
    const response = await GET<BreedList>('/common/breeds');
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get breeds');
  }
};

export const getGraphics = async (params?: QueryParams) => {
  const queryStr = params ? new URLSearchParams(params).toString() : '';
  try {
    const {
      result: { resultCode },
      body,
    } = await GET<Graphic[]>(`/common/graphics?${queryStr}`);

    return resultCode < 500 ? body : [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get graphics');
  }
};
export const uploadGraphic = async (params: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await PUT(`/common/graphics`, params, {
      headers: {
        'Content-Type': 'multipart/form-data', // 요청 특정 헤더 설정
      },
    });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload graphics');
  }
};
