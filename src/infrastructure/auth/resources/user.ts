import {db} from "@/domain/shared/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({where: {email}});
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id?: string) => {
  if (!id) return null;

  try {
    return await db.user.findUnique({where: {id}});
  } catch (error) {
    return null;
  }
};
