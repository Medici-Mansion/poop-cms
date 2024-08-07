import { GET, PUT, POST, DELETE } from '@/server/axios';
import type {
  Breed,
  GetBreedsParams,
  Graphic,
  GraphicParams,
  pageResponse,
} from '@/types';

// parameter -> query 변환 함수 정의
const toRecord = (
  params?: GraphicParams | GetBreedsParams,
): Record<string | number, string> => {
  const result: Record<string | number, string> = {};
  if (params) {
    for (const key in params) {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ''
      ) {
        result[key] = params[key] as string;
      }
    }
  }
  return result;
};

export const getBreeds = async (query?: GetBreedsParams) => {
  const queryStr = query ? new URLSearchParams(toRecord(query)).toString() : '';
  try {
    const {
      result: { resultCode },
      body,
    } = await GET<pageResponse<Breed>>(`/breeds?${queryStr}`);

    return resultCode < 500
      ? body
      : {
          list: [],
          took: 1,
          page: 1,
          total: 1,
          totalPage: 11,
        };
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
    } = await GET<pageResponse<Graphic>>(
      `/graphics${queryStr && '?' + queryStr}`,
    );

    return resultCode < 500
      ? body
      : {
          list: [],
          took: 1,
          page: 1,
          total: 1,
          totalPage: 11,
        };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get graphics');
  }
};

export const uploadBreed = async (formData: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await PUT(`/breeds`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload breeds');
  }
};

export const uploadGraphic = async (formData: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await PUT(`/graphics`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload graphics');
  }
};

export const updateBreed = async (formData: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await POST(`/breeds`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update breeds');
  }
};
export const updateGraphic = async (formData: FormData) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await POST(`/graphics`, formData, {
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

export const deleteBreeds = async (ids: string[]) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await DELETE(`/breeds`, { ids });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete breeds');
  }
};

export const deleteGraphics = async (ids: string[]) => {
  try {
    const {
      result: { resultCode },
      body,
    } = await DELETE(`/graphics`, { ids });

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete graphics');
  }
};
