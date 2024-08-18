import { z } from 'zod';

export const LoginSchema = z.object({
  id: z.string().min(1, {
    message: '아이디를 입력해주세요',
  }),
  password: z.string().min(1, {
    message: '패스워드를 입력해주세요',
  }),
});

export const RegisterSchema = z.object({
  id: z.string().min(1, {
    message: '아이디를 입력해주세요',
  }),
  password: z.string().min(6, {
    message: '최소 6자리 이상 입력해주세요',
  }),
});

export const BreedUploadSchema = z.object({
  nameKR: z.string().min(1, {
    message: '국문 이름을 입력해주세요.',
  }),
  nameEN: z.string().min(1, {
    message: '영문 이름을 입력해주세요.',
  }),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file instanceof File && file.size > 0,
      '파일을 등록해주세요.',
    ),
});

export const GraphicUploadSchema = z.object({
  category: z.string().min(1, {
    message: '카테고리를 선택해주세요.',
  }),
  name: z.string().min(1, {
    message: '파일명을 입력해주세요.',
  }),
  file: z
    .instanceof(File)
    .refine(
      (file) => file instanceof File && file.size > 0,
      '파일을 등록해주세요.',
    ),
});

export const BreedUpdateSchema = z.object({
  nameKR: z.string().optional(),
  nameEN: z.string().optional(),
});

export const GraphicUpdateSchema = z.object({
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  name: z.string().optional(),
  type: z.string().optional(),
});

export const ReportUpdateSchema = z.object({
  // category: z.string().min(1, '카테고리를 입력해주세요.'),
  // title: z.string().min(1, '제목을 입력해주세요.'),
  // author: z.string().min(1, '게시글 작성자를 입력해주세요.'),
  // reason: z.string().min(1, '신고 사유를 입력해주세요.'),
  // reportedDate: z.string().min(1, '신고일을 입력해주세요.'),
  status: z.string().min(1, '처리 상태를 선택해주세요.'),
});

export const ToonUpdateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  tags: z.string().min(1, '해시태그를 입력해주세요.'),
});

export const ChallengeUpdateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  // thumbnail: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file instanceof File && file.size > 0,
  //     '썸네일 이미지를 등록해주세요.',
  //   ),
  postCategory: z.string().min(1, '카테고리를 선택해주세요.'),
  period: z.string().min(1, '챌린지 기간을 입력해주세요.'),
});

export const QuestionUpdateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  // thumbnail: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file instanceof File && file.size > 0,
  //     '썸네일 이미지를 등록해주세요.',
  //   ),
  postCategory: z.string().min(1, '카테고리를 선택해주세요.'),
  contents: z.string().min(1, '게시글 내용을 입력해주세요.'),
});
