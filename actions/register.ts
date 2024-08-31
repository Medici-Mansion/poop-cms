'use server';

import bcryptjs from 'bcryptjs';

import { prisma } from '@/server/db';
import type { z } from 'zod';
import { RegisterSchema } from '@/lib/validators';
import { getUserById } from '@/data/user';
import { generateIdFromEntropySize } from 'lucia';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log('registr');
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { username, password } = validatedFields.data;

  const userId = generateIdFromEntropySize(10);
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserById(username);

  if (existingUser) {
    return { error: '이미 존재하는 아이디입니다.' };
  }
  await prisma.user.create({
    data: {
      id: userId,
      username,
      password_hash: hashedPassword,
    },
  });

  return { success: '계정이 생성되었습니다.' };
};
