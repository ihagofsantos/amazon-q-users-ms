export interface IJWT {
    generateToken(id: number, email: string): string;
    verifyToken(token: string): boolean;
}