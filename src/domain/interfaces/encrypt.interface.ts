export interface IEncrypt {
    encryptpass(password: string): Promise<string> 
    comparepassword(password: string, hashPassword: string): boolean
}