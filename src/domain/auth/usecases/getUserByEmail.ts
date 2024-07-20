import {AuthRepository} from "@/domain/auth/repository/AuthRepository";
import {AuthRepositoryImpl} from "@/infrastructure/auth/repositories/AuthRepositoryImpl";

export class getUserByEmail {
    authRepository: AuthRepository = new AuthRepositoryImpl();
    constructor() {
    }
    execute(email: string) {
        return this.authRepository.getUserByEmail(email);
    }
}
