import { ConflictError, NotFoundError } from "../../../interface/utils/errors";
import { IUserRepository } from "../../repositories/user.repository"

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ){}

    async execute({id, name, email}: UpdateUser.Input): Promise<void> {
        const user = await this.userRepository.getUserById(id);
        const existingUser = await this.userRepository.getUserByEmail(email);
        
        if(!user) throw new NotFoundError("user not found");

        if(existingUser && existingUser.id !== id) {
            throw new ConflictError("Email already exists");
        }
        
        await this.userRepository.updateUser(id, name, email);
    } 
}

export namespace UpdateUser {
    export type Input = {
        id: number,
        name: string,
        email: string
    }
}