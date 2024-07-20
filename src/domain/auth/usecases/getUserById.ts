import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getUserById {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }

    execute(id: string | undefined) {
        return this.authRepository.getUserById(id);
    }
}
