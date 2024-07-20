import {z} from "zod";
import {RegisterSchema} from "@/domain/auth/schema/register.schema";

import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";
import {ResetSchema} from "@/domain/auth/schema/reset.schema";

export class resetPassword {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    async execute(values: z.infer<typeof ResetSchema>) {
        return this.authRepository.resetPassword(values);
    }
}
