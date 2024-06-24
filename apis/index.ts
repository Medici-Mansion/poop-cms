import { GET } from '@/server/axios';
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
