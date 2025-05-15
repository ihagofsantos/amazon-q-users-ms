import { UnauthorizedException } from "../../../interface/utils/errors";
import { IEncrypt } from "../../interfaces/encrypt.interface";
import { IJWT } from "../../interfaces/jwt.interface";
import { IUserRepository } from "../../repositories/user.repository";

export class LoginUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypt: IEncrypt,
        private readonly jwtService: IJWT,
    ){}

    async execute({email, password}: LoginUserUseCase.Input): Promise<LoginUserUseCase.Output> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const isPasswordValid =  this.encrypt.comparepassword(password, user.password);
        console.log('isPasswordValid', isPasswordValid)
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }
        return {
            token: this.jwtService.generateToken(user.id!, user.email),
        }
    }
}

export namespace LoginUserUseCase {
    export type Input = {
        email: string;
        password: string;
    }

    export type Output = {
        token: string
    }
}