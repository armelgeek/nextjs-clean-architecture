import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import {v4 as uuid} from "uuid";
import {getPasswordResetTokenByEmail} from "@/domain/auth/usecases/getPasswordResetTokenByEmail";
import {db} from "@/domain/shared/lib/db";
import {getVerificationTokenByEmail} from "@/domain/auth/usecases/getVerificationTokenByEmail";
import {getTwoFactorTokenByEmail} from "@/domain/auth/usecases/getTwoFactorTokenByEmail";
import {TypeOf, z} from "zod";
import {signIn, signOut} from '@/auth';
import AuthSchema from "@/domain/auth/schema/auth.schema";
import {sendPasswordResetEmail, sendTwoFactorTokenEmail, sendVerificationEmail} from "@/domain/shared/lib/email";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {getCurrentUser} from "@/domain/shared/lib/auth";
import {RegisterSchema} from "@/domain/auth/schema/register.schema";
import {ResetSchema} from "@/domain/auth/schema/reset.schema";
import {SettingsSchema} from "@/domain/auth/schema/setting.schema";
import {NewPasswordSchema} from "@/domain/auth/schema/new.password.schema";
import * as authResource from "@/infrastructure/auth/resources/account";

interface AuthRemoteDataSource {
    login(values: TypeOf<typeof AuthSchema>, callbackUrl?: string | null): any;
    login( values: z.infer<typeof AuthSchema>, callbackUrl?: string | null):any;
    logout(): void;
    updatePassword (
        values: any,
        token?: string | null
    ): void
    register(values: any): void;
    resetPassword(values: any): void;
    settingAccount(values: any): void;
    checkVerificationToken(token:string): any;
    getUserByEmail(id: string): any;
    generatePasswordResetToken(email: string): any | null;
    generateVerificationToken(email:string): any | null;
    generateTwoFactorToken(email:string): any  | null;
    getUserById(id:string|undefined): any | null;
    getTwoFactorConfirmationByUserId(userId:string|undefined):any | null;
    linkAccount(user:any): any | null;
    getAccountByUserId(userId:string): any | null;
    getVerificationTokenByToken(token:string): any | null;
    getPasswordResetTokenByEmail(token:string): any | null;
}

export class AuthDataSource implements AuthRemoteDataSource{

    async login(values: TypeOf<typeof AuthSchema>, callbackUrl?: string | null) {
        const validatedFields = AuthSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid fields' };
        }

        const { email, password, code } = validatedFields.data;

        const existingUser = await this.getUserByEmail(email);

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: 'Invalid credentials!' };
        }

        if (!existingUser.emailVerified) {
            const token = await this.generateVerificationToken(existingUser.email);

            await sendVerificationEmail(token.email, token.token);

            return {
                success: 'A confirmation email has been sent to your email address',
            };
        }

        if (existingUser.isTwoFactorEnabled && existingUser.email) {
            if (code) {
                const twoFactorToken = await this.getTwoFactorTokenByEmail(existingUser.email);

                if (!twoFactorToken || twoFactorToken.token !== code) {
                    return { error: 'Invalid code!' };
                }

                const hasExpired = new Date(twoFactorToken.expires) < new Date();

                if (hasExpired) {
                    return { error: 'Token has expired!' };
                }

                await db.twoFactorToken.delete({
                    where: { id: twoFactorToken.id },
                });

                const exisitngConfirmation = await this.getTwoFactorConfirmationByUserId(
                    existingUser.id
                );

                if (exisitngConfirmation) {
                    await db.twoFactorConfirmation.delete({
                        where: { id: exisitngConfirmation.id },
                    });
                }

                await db.twoFactorConfirmation.create({
                    data: {
                        userId: existingUser.id,
                    },
                });
            } else {
                const twoFactorToken = await this.generateTwoFactorToken(existingUser.email);
                await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

                return { twoFactor: true };
            }
        }

        try {
            await signIn('credentials', {
                email,
                password,
                redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            });

            return { success: 'Successfully logged in!' };
        } catch (error) {
            if (error instanceof AuthError) {
                if (error.type === 'CredentialsSignin') {
                    return { error: 'Invalid credentials!' };
                }

                return { error: 'Something went wrong!' };
            }

            throw error;
        }
    }
    async logout() {
        await signOut();
    }

    async checkVerificationToken(token: string) {
        const existingToken = await this.getVerificationTokenByToken(token);

        if (!existingToken) {
            return { error: 'Token does not exist!' };
        }

        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
            return { error: 'Token has expired!' };
        }

        const existingUser = await this.getUserByEmail(existingToken.email);

        if (!existingUser) {
            // Error message is the same for security reasons
            return { error: 'Token has expired!' };
        }

        await db.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingUser.email,
            },
        });

        await db.verificationToken.delete({
            where: { id: existingToken.id },
        });

        return { success: 'Email verified!' };
    }
    async register(values: TypeOf<typeof RegisterSchema>) {
        const validatedFields = RegisterSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid fields' };
        }

        const { email, password, name } = validatedFields.data;

        const existingUser = await this.getUserByEmail(email);

        if (existingUser) {
            return { error: 'Email is already in use' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        const verificationToken = await this.generateVerificationToken(email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {
            success: 'A confirmation email has been sent to your email',
        };
    }

    async resetPassword(values: TypeOf<typeof ResetSchema>) {
        const validatedFields = ResetSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid email' };
        }

        const { email } = validatedFields.data;

        const existingUser = await this.getUserByEmail(email);

        if (!existingUser) {
            return { error: 'Invalid email' };
        }

        const passwordResetToken = await this.generatePasswordResetToken(email);

        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token
        );

        return { success: 'Reset email sent!' };
    }

    async settingAccount(values: TypeOf<typeof SettingsSchema>) {
        const user = await getCurrentUser();

        if (!user) {
            return { error: 'Not authorized' };
        }

        const dbUser = await this.getUserById(user.id);

        if (!dbUser) {
            return { error: 'Not authorized' };
        }

        if (!user.isOAuth) {
            values.email = undefined;
            values.password = undefined;
            values.newPassword = undefined;
        }

        if (user.isOAuth) {
            values.email = undefined;
            values.password = undefined;
            values.newPassword = undefined;
            values.isTwoFactorEnabled = undefined;
        }

        if (values.email && values.email !== user.email) {
            const existingUser = await this.getUserByEmail(values.email);

            if (existingUser) {
                return { error: 'Email is already in use' };
            }

            const verfificationToken = await this.generateVerificationToken(values.email);

            await sendVerificationEmail(
                verfificationToken.email,
                verfificationToken.token
            );

            return { success: 'Verification email sent' };
        }

        if (values.password && values.newPassword && dbUser.password) {
            const passwordMatch = await bcrypt.compare(
                values.password,
                dbUser.password
            );

            if (!passwordMatch) {
                return { error: 'Invalid password' };
            }

            values.password = await bcrypt.hash(values.newPassword, 10);
            values.newPassword = undefined;
        }

        await db.user.update({
            where: { id: user.id },
            data: {
                ...values,
            },
        });

        return { success: 'Settings updated' };
    }

    async updatePassword(values: TypeOf<typeof NewPasswordSchema>, token?: string | null) {
        if (!token) {
            return { error: 'Invalid token' };
        }

        const validatedFields = NewPasswordSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid password!' };
        }

        const { password } = validatedFields.data;
        const existingToken = await this.getPasswordResetTokenByToken(token);

        if (!existingToken) {
            return { error: 'Invalid token' };
        }

        const tokenHasExpired = new Date(existingToken.expires) < new Date();

        if (tokenHasExpired) {
            return { error: 'Invalid token' };
        }

        const existingUser = await this.getUserByEmail(existingToken.email);

        if (!existingUser) {
            return { error: 'Invalid token' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.update({
            where: { id: existingUser.id },
            data: { password: hashedPassword },
        });

        await db.passwordResetToken.delete({
            where: { id: existingToken.id },
        });

        return { success: 'Password updated' };
    }
    async getUserByEmail(email: string) {
        try {
            return await db.user.findUnique({where: {email}});
        } catch (error) {
            return null;
        }
    }
    async generatePasswordResetToken(email: string) {
        const token = uuid();
        const oneHour = 3600 * 1000;
        const expires = new Date(new Date().getTime() + oneHour);
        const existingToken = new getPasswordResetTokenByEmail().execute(email);
        if (existingToken) {
            await db.passwordResetToken.delete({
                where: { id: existingToken.id },
            });
        }
        return db.passwordResetToken.create({
            data: {
                email,
                token,
                expires,
            },
        });
    }

    async generateTwoFactorToken(email: string) {
        const token = uuid();
        const oneHour = 3600 * 1000;
        const expires = new Date(new Date().getTime() + oneHour);

        const existingToken = new getVerificationTokenByEmail().execute(email);

        if (existingToken) {
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            });
        }

        return db.verificationToken.create({
            data: {
                email,
                token,
                expires,
            },
        });
    }

    async generateVerificationToken(email: string) {
        const token = crypto.randomInt(100000, 1000000).toString();
        const tenMinutes = 10 * 60 * 1000;

        const expires = new Date(new Date().getTime() + tenMinutes);

        const existingToken = new getTwoFactorTokenByEmail().execute(email);

        if (existingToken) {
            await db.twoFactorToken.delete({
                where: { id: existingToken.id },
            });
        }

        return db.twoFactorToken.create({
            data: {
                email,
                token,
                expires,
            },
        });
    }

    async getUserById(id: string | undefined) {
        if (!id) return null;

        try {
            return await db.user.findUnique({where: {id}});
        } catch (error) {
            return null;
        }
    }

    async getTwoFactorConfirmationByUserId(userId: string) {
        try {
            const twoFactorConfirmation = await db.twoFactorConfirmation.findFirst({
                where: { userId },
            });
            if(twoFactorConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }
            return twoFactorConfirmation;
        } catch (error) {
            return null;
        }

    }

    async linkAccount(user: any) {
        await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
        });
    }

    async getAccountByUserId(userId: string) {
        return await authResource.getAccountByUserId(userId);
    }

    async getVerificationTokenByToken(token: string) {
        try {
            return await db.verificationToken.findUnique({
                where: {token},
            });
        } catch (error) {
            return null;
        }
    }

    async getTwoFactorTokenByEmail(email: string) {
        try {
            return await db.verificationToken.findFirst({
                where: {email},
            });
        } catch (error) {
            return null;
        }
    }

    async getPasswordResetTokenByEmail(email:string) {
        try{
            return await db.passwordResetToken.findFirst({
            where: {email},
        });
        } catch (error) {
            return null;
        }
    }

    async getPasswordResetTokenByToken(token: string) {
        try {
            return await db.passwordResetToken.findUnique({
                where: {token},
            });
        } catch (error) {
            return null;
        }
    }

    async getTwoFactorTokenByToken(token: string) {
        try {
            return await db.twoFactorToken.findUnique({
                where: {token},
            });
        } catch (error) {
            return null;
        }
    }

    async getVerificationTokenByEmail(email: string) {
        try {
            return await db.twoFactorToken.findFirst({
                where: {email},
            });
        } catch (error) {
            return null;
        }
    }
}
