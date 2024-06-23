import { GET } from '@/server/axios';
import type { BreedList, Graphic } from '@/types';

export const getBreeds = async () => {
  try {
    const response = await GET<BreedList>('/common/breeds');
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get breeds');
  }
};

export const getGraphics = async () => {
  try {
    const {
      result: { resultCode },
      body,
    } = await GET<Graphic[]>('/common/graphics');

    return resultCode < 500 ? body : [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get graphics');
  }
};
