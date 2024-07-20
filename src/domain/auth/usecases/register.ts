import {z} from "zod";
import {RegisterSchema} from "@/domain/auth/schema/register.schema";

import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class register {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    async execute(values: z.infer<typeof RegisterSchema>) {
        return this.authRepository.register(values);
    }
}
