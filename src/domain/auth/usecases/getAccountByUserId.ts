import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getAccountByUserId {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    execute(userId: string) {
        return this.authRepository.getAccountByUserId(userId);
    }
}
