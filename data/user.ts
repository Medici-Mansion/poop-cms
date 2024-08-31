import { prisma } from '@/server/db';

export const getUserById = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    return user;
  } catch {
    return null;
  }
};
