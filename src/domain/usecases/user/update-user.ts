import { ConflictError, NotFoundError } from "../../../interface/utils/errors";
import { IUserRepository } from "../../repositories/user.repository"

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ){}

    async execute({id, name, email}: UpdateUser.Input): Promise<void> {
        const user = await this.userRepository.getUserById(id);
        
        if(!user) throw new NotFoundError("User not found");
        
        if(email !== user.email) {
            const existingUser = await this.userRepository.getUserByEmail(email);
            if(existingUser && existingUser.id !== id) {
                throw new ConflictError("Email already in use");
            }
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