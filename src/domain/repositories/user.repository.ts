import { User } from "../entities/user.entity";


export interface IUserRepository {
    findAll(page: number, limit: number): Promise<{users: User[], total: number}>
    createUser(user: User): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: number): Promise<User | null>;
    updateUser(id: number, name: string, email: string): Promise<void>;
    deleteUser(id: number) : Promise<void>;
}