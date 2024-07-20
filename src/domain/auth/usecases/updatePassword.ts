import {z} from "zod";
import {NewPasswordSchema} from "@/domain/auth/schema/new.password.schema";
import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class updatePassword {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    async execute(values: z.infer<typeof NewPasswordSchema>,
            token?: string | null) {
        return this.authRepository.updatePassword(values, token);
    }
}
