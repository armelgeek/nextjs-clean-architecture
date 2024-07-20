import {db} from "@/domain/shared/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findFirst({
      where: {userId},
    });
  } catch (error) {
    return null;
  }
};
