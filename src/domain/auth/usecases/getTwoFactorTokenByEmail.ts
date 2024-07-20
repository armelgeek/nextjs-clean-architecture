import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getTwoFactorTokenByEmail {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(email: string) {
        return this.authRepository.getTwoFactorTokenByEmail(email);
    }
}
