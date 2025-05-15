import { IJWT } from "../../domain/interfaces/jwt.interface";
import jwt from 'jsonwebtoken';

export class JWT implements IJWT {
    private secretKey: string | undefined;

    constructor() {
        this.secretKey = process.env.JWT_SECRET;
        this.validateSecret();
    }
    
    generateToken(id: number, email: string): string {
        return jwt.sign({ 
            id, 
            email,
        }, this.secretKey!, { expiresIn: '1h' });        
    }
    
    verifyToken(token: string): boolean {
        try {
            jwt.verify(token, this.secretKey!);
            return true;
        } catch (error) {
            return false;
        }
    }

    private validateSecret() {
        if(!this.secretKey === undefined) {
            throw new Error('Secret key is not defined');
        }
    }


}