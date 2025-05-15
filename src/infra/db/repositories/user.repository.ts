import { AppDataSource } from "../../../data-source";
import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { UserEntity } from "../entities/User";

export class UserRepository implements IUserRepository {
    private userEntity;
    constructor () {
        this.userEntity = AppDataSource.getRepository(UserEntity);
    }
    async findAll(page: number, limit: number): Promise<{users: User[], total: number}> {

        const [users, total] = await this.userEntity.findAndCount({
            skip: (page - 1) * limit,
            take: limit
        })

        return {
            users: users.map(user => new User({
                ...user,
            })),
            total
        }

    }

    async createUser({name, email, password}: User): Promise<User> {
        const user = this.userEntity.create({
            name,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        this.userEntity.save(user);

        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userEntity.findOne({
            where: {
                email
            }
        })

        return user ? new User({
            ...user,
        }) : null
    }
    
    async getUserById(id: number): Promise<User | null> {
        const user = await this.userEntity.findOne({
            where: {
                id
            }
        })

        return user ? new User({
            ...user,
        }) : null
    }
    async updateUser(id: number, name: string, email: string): Promise<void> {
        await this.userEntity.update(id, {
            name: name || undefined, 
            email: email || undefined,
            updatedAt: new Date(),
        })
    }

    async deleteUser(id: number) : Promise<void> {
        await this.userEntity.delete(id);
    }
}