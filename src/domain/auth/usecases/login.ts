import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";
import {z} from "zod";
import AuthSchema from "@/domain/auth/schema/auth.schema";

export class login {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    execute(values: z.infer<typeof AuthSchema>, callbackUrl?: string | null) {
        return this.authRepository.login(values,callbackUrl);
    }
}
