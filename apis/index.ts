import { GET } from '@/server/axios';
import { BreedList } from '@/types';

export const getBreeds = async (): Promise<BreedList> => {
  try {
    const response = await GET<BreedList>('/common/breeds');
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get breeds');
  }
};
