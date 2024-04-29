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

// Example
export const employeeFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().min(1),
});

export type EmployeeFromValues = z.infer<typeof employeeFormSchema>;

export const employeeColumn = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type EmployeeColumn = z.infer<typeof employeeColumn>;

export const updateEmployeeFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
});
