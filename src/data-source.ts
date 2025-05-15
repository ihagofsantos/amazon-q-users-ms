import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite", 
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "infra/db/entities/**/*.{ts,js}")],
  migrations: [join(__dirname, "infra/db/entities/migration/**/*.{ts,js}")],
  subscribers: [join(__dirname, "infra/db/entities/subscriber/**/*.{ts,js}")],});
