import { GET } from '@/server/axios';
import type { BreedList } from '@/types';

export const getBreeds = async () => {
  try {
    const response = await GET<BreedList>('/common/breeds');
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get breeds');
  }
};
