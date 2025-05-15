import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "postgres", // Tipo do banco de dados (pode ser "mysql", "sqlite", "postgres", etc.)
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test_database",
  synchronize: false, // Não recomendado para produção
  logging: true,
  entities: [join(__dirname, "src/entity/**/*.{ts,js}")],
  migrations: [join(__dirname, "src/migration/**/*.{ts,js}")],
  subscribers: [join(__dirname, "src/subscriber/**/*.{ts,js}")],
});