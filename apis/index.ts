import { GET, PUT, POST, DELETE } from '@/server/axios';
import type { BreedList, Graphic, GraphicParams } from '@/types';

// 변환 함수 정의
const toRecord = (params?: GraphicParams): Record<string, string> => {
  const result: Record<string, string> = {};
  if (params) {
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        result[key] = params[key] as string;
      }
    }
  }
  return result;
};

export const getBreeds = async () => {
  try {
    const response = await GET<BreedList>('/common/breeds');
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get breeds');
  }
};

export const getGraphics = async (params?: GraphicParams) => {
  const queryStr = params
    ? new URLSearchParams(toRecord(params)).toString()
    : '';
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

export const uploadGraphic = async (formData: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await PUT(`/common/graphics`, formData, {
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

export const updateGraphic = async (formData: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await POST(`/common/graphics`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update graphics');
  }
};

export const deleteGraphic = async (id: string) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await DELETE(`/common/graphic`, { id });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete graphics');
  }
};
