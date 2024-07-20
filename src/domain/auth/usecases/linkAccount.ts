import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class linkAccount {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    execute(user: any) {
        return this.authRepository.linkAccount(user);
    }
}
