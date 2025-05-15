import { UserRepository } from "../../../infra/db/repositories/user.repository";
import { NotFoundError } from "../../../interface/utils/errors";

export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(id: number): Promise<void> {
        const user = await this.userRepository.getUserById(id);

        if(!user) {
            throw new NotFoundError("user not found");
        }

        await this.userRepository.deleteUser(id);
        
    }
}
