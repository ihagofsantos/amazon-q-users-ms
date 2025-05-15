import { NotFoundError } from "../../../interface/utils/errors";
import { IUserRepository } from "../../repositories/user.repository";

export class FindUserByIdUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ){}

    async execute(id: number): Promise<FindUserByIdUseCase.Output> {
        const user = await this.userRepository.getUserById(id);

        if(!user) throw new NotFoundError("user not found");

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}

export namespace FindUserByIdUseCase {
    export type Output = {
        id: number | undefined,
        name: string,
        email: string,
    }
}