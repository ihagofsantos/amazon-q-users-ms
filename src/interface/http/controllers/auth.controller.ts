import { NextFunction, Request, Response } from "express";
import { LoginUserUseCase } from "../../../domain/usecases/user/login-user.usecase";
import { Encrypt } from "../../../infra/bcrypt/encrypt";
import { UserRepository } from "../../../infra/db/repositories/user.repository";
import { JWT } from "../../../infra/jwt/jwt";

export class AuthController {
    static async login(request: Request, response: Response, next: NextFunction) {
            try {
                const { email, password } = request.body;
                const usecase = new LoginUserUseCase(
                    new UserRepository(),
                    new Encrypt(),
                    new JWT(),
                )
    
                const data = await usecase.execute({ email, password });
                
                response.status(200).json(data);
            } catch (error) {
                next(error);
            }
        }
}