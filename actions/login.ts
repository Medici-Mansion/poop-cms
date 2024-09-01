'use server';

import type { z } from 'zod';
import { cookies } from 'next/headers';
import { LoginSchema } from '@/lib/validators';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserById } from '@/data/user';
import bcryptjs from 'bcryptjs';
import { lucia } from '@/server/auth';
import { redirect } from 'next/navigation';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { username, password } = validatedFields.data;

  const existingUser = await getUserById(username);

  if (!existingUser || !existingUser.password_hash)
    return {
      error: '아이디 또는 비밀번호가 틀렸습니다',
    };

  const passwordsMatch = await bcryptjs.compare(
    password,
    existingUser.password_hash as string,
  );

  if (!passwordsMatch)
    return {
      error: '아이디 또는 비밀번호가 틀렸습니다',
    };

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(DEFAULT_LOGIN_REDIRECT);
};
