import { DataSource } from "typeorm";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite", // Alterado para sqlite conforme .env
  database: process.env.DB_DATABASE || "database.sqlite",
  synchronize: true, // Em desenvolvimento podemos usar true
  logging: true,
  entities: [join(__dirname, "src/entity/**/*.{ts,js}")],
  migrations: [join(__dirname, "src/migration/**/*.{ts,js}")],
  subscribers: [join(__dirname, "src/subscriber/**/*.{ts,js}")],
});