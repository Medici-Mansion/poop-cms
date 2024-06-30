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

export const GraphicUpdateSchema = z.object({
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  name: z.string().min(1, '파일명을 입력해주세요.'),
  file: z
    .any()
    .refine(
      (file) => file instanceof File && file.size > 0,
      '파일을 등록해주세요.',
    ),
  type: z.string().min(1, '파일 타입을 선택해주세요.'),
});
