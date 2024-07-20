import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthDataSource} from "@/infrastructure/auth/datasources/AuthDataSource";
import {TypeOf} from "zod";
import AuthSchema from "@/domain/auth/schema/auth.schema";
import {RegisterSchema} from "@/domain/auth/schema/register.schema";
import {ResetSchema} from "@/domain/auth/schema/reset.schema";
import {SettingsSchema} from "@/domain/auth/schema/setting.schema";
import {NewPasswordSchema} from "@/domain/auth/schema/new.password.schema";


export class AuthRepositoryImpl implements  AuthRepository{
    authDataSource = new AuthDataSource();
    constructor() {}

    async login(values: TypeOf<typeof AuthSchema>, callbackUrl?: string | null) {
        return await this.authDataSource.login(values,callbackUrl);
    }


    async checkVerificationToken(token: string) {
        return await this.authDataSource.checkVerificationToken(token);
    }

    async logout() {
      await this.authDataSource.logout();
    }

    async register(values: TypeOf<typeof RegisterSchema>) {
        return await this.authDataSource.register(values);
    }

    async resetPassword(values: TypeOf<typeof ResetSchema>) {
        return await this.authDataSource.resetPassword(values);
    }

    async settingAccount(values: TypeOf<typeof SettingsSchema>) {
        return await this.authDataSource.settingAccount(values);
    }

    async updatePassword(values: TypeOf<typeof NewPasswordSchema>, token?: string | null) {
        return await this.authDataSource.updatePassword(values,token);
    }

    async getUserByEmail(email: string): Promise<any> {
       return await this.authDataSource.getUserByEmail(email);
    }


    async getUserById(id: string|undefined) {
       return await this.authDataSource.getUserById(id);
    }

    async getAccountByUserId(userId: string) {
        return await this.authDataSource.getAccountByUserId(userId);
    }

    async getPasswordResetTokenByEmail(email: string): Promise<any> {
        return await this.authDataSource.getPasswordResetTokenByEmail(email);
    }

    async getPasswordResetTokenByToken(token: string): Promise<any> {
        return await this.authDataSource.getPasswordResetTokenByToken(token);
    }

    async getTwoFactorConfirmationByUserId(userId: string) {
        return await this.authDataSource.getTwoFactorConfirmationByUserId(userId);
    }

    async getTwoFactorTokenByEmail(email: string) {
        return await this.authDataSource.getTwoFactorTokenByEmail(email);
    }

    async getTwoFactorTokenByToken(token: string) {
        return await this.authDataSource.getTwoFactorTokenByToken(token);
    }


    async getVerificationTokenByEmail(email: string) {
        return await this.authDataSource.getVerificationTokenByEmail(email);
    }

    async getVerificationTokenByToken(token: string) {
       return await this.authDataSource.getVerificationTokenByToken(token);
    }

    async generatePasswordResetToken(email: string) {
        await this.authDataSource.generatePasswordResetToken(email);
    }

    async generateTwoFactorToken(email: string) {
        await this.authDataSource.generateTwoFactorToken(email);
    }

    async generateVerificationToken(email: string) {
        await this.authDataSource.generateVerificationToken(email);
    }

    async linkAccount(user: any) {
        await this.authDataSource.linkAccount(user);
    }
}
