import {z} from "zod";
import {RegisterSchema} from "@/domain/auth/schema/register.schema";

import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";
import {SettingsSchema} from "@/domain/auth/schema/setting.schema";

export class settingAccount {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    async execute(values: z.infer<typeof SettingsSchema>) {
        return this.authRepository.settingAccount(values);
    }
}
