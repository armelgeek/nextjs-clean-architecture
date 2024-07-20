import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getTwoFactorConfirmationByUserId {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(userId: string): any {
        return this.authRepository.getTwoFactorConfirmationByUserId(userId);
    }
}
