import { GET, PUT, POST, DELETE } from '@/server/axios';
import type {
  Breed,
  BreedsQuery,
  SupportQuery,
  PostQuery,
  Graphic,
  GraphicsQuery,
  Report,
  pageResponse,
  Toon,
  Challenge,
  Question,
} from '@/types';
import { tempReportsData } from '@/lib/data/supportSamepleData';
import { tempToonsData } from '@/lib/data/postToonSamepleData';
import { tempChallengesData } from '@/lib/data/postChallengeSamepleData';
import { tempQuestionsData } from '@/lib/data/postQuestionSamepleData';

// parameter -> query 변환 함수 정의
const toRecord = (
  params?: GraphicsQuery | BreedsQuery | SupportQuery | PostQuery,
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

export const getBreeds = async (query?: BreedsQuery) => {
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

export const getGraphics = async (params?: GraphicsQuery) => {
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

// 회웑 정보

// export const getReports = async (query?: SupportQuery) => {
//   const queryStr = query ? new URLSearchParams(toRecord(query)).toString() : '';
//   try {
//     const {
//       result: { resultCode },
//       body,
//     } = await GET<Breed[]>(`/reports${queryStr && '?' + queryStr}`);
//     return resultCode < 500 ? body : [];
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to get breeds');
//   }
// };

// export const updateReports = async (formData: FormData) => {
//   try {
//     const {
//       result: { resultCode },
//       body,
//     } = await POST(`/reports`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return resultCode < 500 ? body : null;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to update reports');
//   }
// };

/*
 * 신고 내역 조회, 게시물 조회
 * 테스트용 더미 데이터
 */
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
  };
  body: pageResponse<T>;
}

// 신고 정보 조회
export const getReports = async (query?: SupportQuery) => {
  const queryStr = query ? new URLSearchParams(toRecord(query)).toString() : '';
  console.log(queryStr);
  try {
    const {
      result: { resultCode },
      body,
    } = await new Promise<ApiResponse<Report>>((resolve) =>
      setTimeout(() => resolve(tempReportsData), 300),
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
    throw new Error('Failed to get reports');
  }
};

export const updateReports = async (formData: FormData) => {
  console.log('formData', formData);
  try {
    const {
      result: { resultCode },
      body,
    } = await new Promise<ApiResponse<Report>>((resolve) =>
      setTimeout(() => resolve(tempReportsData), 300),
    );

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update reports');
  }
};

// 게시물 조회
export const getPosts = async (query?: PostQuery) => {
  const defaultResponse = {
    list: [],
    took: 1,
    page: 1,
    total: 1,
    totalPage: 11,
  };
  const queryStr = query ? new URLSearchParams(toRecord(query)).toString() : '';
  console.log(queryStr);

  const category = query?.category || '';

  try {
    if (category === 'Toon') {
      const {
        result: { resultCode },
        body,
      } = await new Promise<ApiResponse<Toon>>((resolve) =>
        setTimeout(() => resolve(tempToonsData), 300),
      );
      return resultCode < 500 ? body : defaultResponse;
    } else if (category === 'Challenge') {
      const {
        result: { resultCode },
        body,
      } = await new Promise<ApiResponse<Challenge>>((resolve) =>
        setTimeout(() => resolve(tempChallengesData), 300),
      );
      return resultCode < 500 ? body : defaultResponse;
    } else if (category === 'Question') {
      const {
        result: { resultCode },
        body,
      } = await new Promise<ApiResponse<Question>>((resolve) =>
        setTimeout(() => resolve(tempQuestionsData), 300),
      );
      return resultCode < 500 ? body : defaultResponse;
    } else return defaultResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get posts');
  }
};

// 게시글 업데이트
export const updateToons = async (formData: FormData) => {
  console.log('formData', formData);
  try {
    const {
      result: { resultCode },
      body,
    } = await new Promise<ApiResponse<Toon>>((resolve) =>
      setTimeout(() => resolve(tempToonsData), 300),
    );

    return resultCode < 500 ? body : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update toons');
  }
};
