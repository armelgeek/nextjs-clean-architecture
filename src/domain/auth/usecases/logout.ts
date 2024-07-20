import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class logout {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    execute() {
        return this.authRepository.logout();
    }
}
