'use server';

import { z } from 'zod';
import { signIn } from '@/server/auth';
import { LoginSchema } from '@/lib/validators';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { id, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      id,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '비밀번호가 틀렸습니다.' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
