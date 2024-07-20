import {z} from "zod";
import AuthSchema from "@/domain/auth/schema/auth.schema";
import {NewPasswordSchema} from "@/domain/auth/schema/new.password.schema";
import {RegisterSchema} from "@/domain/auth/schema/register.schema";
import {ResetSchema} from "@/domain/auth/schema/reset.schema";
import {SettingsSchema} from "@/domain/auth/schema/setting.schema";

export interface AuthRepository {
    login( values: z.infer<typeof AuthSchema>, callbackUrl?: string | null):any;
    logout(): void;
    updatePassword (
        values: z.infer<typeof NewPasswordSchema>,
        token?: string | null
    ): void
    register(values: z.infer<typeof RegisterSchema>): void;
    resetPassword(values: z.infer<typeof ResetSchema>): void;
    settingAccount(values: z.infer<typeof SettingsSchema>): void;
    checkVerificationToken(token:string): any;
    getUserByEmail(email: string): Promise<any>;
    getUserById(id: string | undefined): any;
    getVerificationTokenByEmail(email:string): any;
    getVerificationTokenByToken(token:string): any;
    getPasswordResetTokenByToken(token: string): Promise<any>;
    getPasswordResetTokenByEmail(email: string): Promise<any>;
    getAccountByUserId(userId: string): any | null;
    getTwoFactorConfirmationByUserId(userId: string): any | null
    getTwoFactorTokenByToken(token:string):any | null;
    getTwoFactorTokenByEmail(email: string): any | null;
    generatePasswordResetToken(email: string): any | null;
    generateVerificationToken(email:string): any | null;
    generateTwoFactorToken(email:string): any  | null;
    linkAccount(user:any):any | null;
}
