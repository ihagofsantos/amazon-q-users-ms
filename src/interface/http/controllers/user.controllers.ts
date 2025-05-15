import {Request, Response, NextFunction} from 'express';
import { CreateUserUseCase } from '../../../domain/usecases/user/create-user.usecase';
import { LoginUserUseCase } from '../../../domain/usecases/user/login-user.usecase';
import { UserRepository } from '../../../infra/db/repositories/user.repository';
import { Encrypt } from '../../../infra/bcrypt/encrypt';
import { JWT } from '../../../infra/jwt/jwt';
import { UpdateUserUseCase } from '../../../domain/usecases/user/update-user';
import { FindUserByIdUseCase } from '../../../domain/usecases/user/find-user-by-id.usecase';
import { DeleteUserUseCase } from '../../../domain/usecases/user/delete-user.usecase';
import { FindAllUsersUseCase } from '../../../domain/usecases/user/find-all-users.usecase';

export class UserController {
    static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password } = request.body;
            const usecase = new CreateUserUseCase(
                new UserRepository(),
                new Encrypt(),
                new JWT(),
            )
            const data = await usecase.execute({ name, email, password });
            response.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async update(request: Request, response: Response, next: NextFunction) {
         try {
            const { name, email } = request.body;
            const { id } = request.params;

            const usecase = new UpdateUserUseCase(
                new UserRepository(),
            )

            const data = await usecase.execute({ id: +id, name, email });
            
            response.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async find(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;

            const useCase = new FindUserByIdUseCase(
                new UserRepository(),
            )

            const data = await useCase.execute(+id);

            response.status(200).json(data)

        } catch (error) {
            next(error);
            
        }
    }
    static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;

            const usecase = new DeleteUserUseCase(
                new UserRepository(),
            );

            await usecase.execute(+id);

            response.status(200).json({ message: 'User deleted' });
        } catch(error) {
            next(error);
        }
    }

    static async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const { page = 1, limit = 10 } = request.query;

            const usecase = new FindAllUsersUseCase(
                new UserRepository(),
            );

            const data = await usecase.execute(
                Number(page),
                Number(limit),
            );

            response.status(200).json(data);
        } catch(error) {
            next(error);
        }
    }
}