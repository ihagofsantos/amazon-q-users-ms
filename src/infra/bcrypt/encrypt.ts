import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { IEncrypt } from "../../domain/interfaces/encrypt.interface";

dotenv.config();

export class Encrypt implements IEncrypt {
  async encryptpass(password: string): Promise<string> {
    return bcrypt.hashSync(password, 12);
  }
  comparepassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}