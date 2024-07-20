import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getPasswordResetTokenByToken {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(token: string): any {
        return this.authRepository.getPasswordResetTokenByToken(token);
    }
}
