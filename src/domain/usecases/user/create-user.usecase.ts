import { ConflictError } from "../../../interface/utils/errors";
import { User } from "../../entities/user.entity";
import { IEncrypt } from "../../interfaces/encrypt.interface";
import { IJWT } from "../../interfaces/jwt.interface";
import { IUserRepository } from "../../repositories/user.repository";

export class CreateUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypt: IEncrypt,
        private readonly jwt: IJWT,
    ) {}
    async execute({name, email, password}: CreateUserUseCase.Input) : Promise<CreateUserUseCase.Output>{
        let user = new User({name, email, password});
        let existingUser = await this.userRepository.getUserByEmail(user.email);

        if (existingUser) {
            throw new ConflictError("User already exists");
        }
        
        user.password = await this.encrypt.encryptpass(user.password);
        user = await this.userRepository.createUser(user);
        return {
            token: this.jwt.generateToken(user.id!, user.email),
        }
    }
}

export namespace CreateUserUseCase {
    export type Input = {
        name: string;
        email: string;
        password: string;
    }
    export type Output = {
        token: string
    }
}