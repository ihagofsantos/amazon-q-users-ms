import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

export const errorHandlerMiddleware = (
    err: any, 
    request: Request, 
    response: Response, 
    next: NextFunction
): void => {
    const errorExpected = err?.status

    if(errorExpected) {
        response.status(err.status).json({
            error: {
                name: err.name,
                message: err.message
            }
        });
        return;
    }

    response.status(500).json({
        error: {
            name: "InternalServerError",
            message: "An unexpected error occurred"
        }
    });
}