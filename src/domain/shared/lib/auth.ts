import { auth } from '@/auth';

export const getCurrentUser = async () => {
    const session = await auth();

    return session?.user;
};

export const getCurrentRole = async () => {
    const session = await auth();

    // @ts-ignore
    return session?.user.role;
};
