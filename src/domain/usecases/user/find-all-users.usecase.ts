import { NotFoundError as NotFoundError } from "../../../interface/utils/errors";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

export class FindAllUsersUseCase {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(page: number, limit: number): Promise<FindAllUsersUseCase.Output> {
        const {users, total} = await this.userRepository.findAll(page, limit);

        if(users.length === 0) {
            throw new NotFoundError("users not found");
        }

        const data = users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        return {
            data,
            total,
            page,
            limit
        }
    }
}

export namespace FindAllUsersUseCase {
    export type Input = {
        page: number;
        limit: number;
    }

    export type Output = {
        data: {
            id: number;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        } [],
        page: number,
        limit: number,
        total: number,
    }
}