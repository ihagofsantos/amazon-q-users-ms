export class User {
    private _id?: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor(user: UserEntity.User) {
        this.validate(user);
        
        this._id = user.id;
        this._name = user.name;
        this._email = user.email;
        this._password = user.password;
        this._createdAt = user.createdAt;
        this._updatedAt = user.updatedAt;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get createdAt(): Date | undefined { 
        return this._createdAt;
    }
    
    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date | undefined { 
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    private validate(user: UserEntity.User): void {
        if (!user.name) {
            throw new Error('Name is required');
        }
        if (!user.email) {
            throw new Error('Email is required');
        }
        if (!user.password) {
            throw new Error('Password is required');
        }
    }
}


export namespace UserEntity {
    export type User = {
        id?: number,
        name: string,
        email: string,
        password: string,
        createdAt?: Date,
        updatedAt?: Date
    }
}