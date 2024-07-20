import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getVerificationTokenByEmail {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(email: string) {
        return this.authRepository.getVerificationTokenByEmail(email);
    }
}
