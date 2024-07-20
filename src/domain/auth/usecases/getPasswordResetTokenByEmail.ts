import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getPasswordResetTokenByEmail {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(email: string): any {
        return this.authRepository.getPasswordResetTokenByEmail(email);
    }
}
