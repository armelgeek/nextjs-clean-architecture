import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class checkVerificationToken {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    execute(token: string) {
        return this.authRepository.checkVerificationToken(token);
    }
}
