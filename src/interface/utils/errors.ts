export class NotFoundError extends Error {    
    public readonly status = 404;
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class UnauthorizedException extends Error {
    public readonly status = 401;
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedException";
    }
}

export class ConflictError extends Error {
    public readonly status = 409;
    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
    }
}