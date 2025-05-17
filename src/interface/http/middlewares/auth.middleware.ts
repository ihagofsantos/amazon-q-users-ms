import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../../infra/jwt/jwt';
import { UnauthorizedException } from '../../utils/errors';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException(
                !authHeader ? 'No token provided' : 'Invalid token format'
            );
        }
        
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET;
        
        if (!secretKey) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        
        try {
            jwt.verify(token, secretKey);
            next();
        } catch (jwtError) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    } catch (error) {
        next(error);
    }
};