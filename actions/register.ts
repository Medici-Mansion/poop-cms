'use server';

import bcryptjs from 'bcryptjs';

import { prisma } from '@/server/db';
import { z } from 'zod';
import { RegisterSchema } from '@/lib/validators';
import { getUserById } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { id, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserById(id);

  if (existingUser) {
    return { error: '이미 존재하는 아이디입니다.' };
  }
  await prisma.user.create({
    data: {
      id,
      password: hashedPassword,
    },
  });

  return { success: '계정이 생성되었습니다.' };
};
