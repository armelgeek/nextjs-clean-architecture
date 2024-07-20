import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getVerificationTokenByToken {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(token: string) {
        return this.authRepository.getVerificationTokenByToken(token);
    }
}
