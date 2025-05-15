import "reflect-metadata";
import { AppDataSource } from "./data-source";

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado com sucesso!");
    // Aqui você pode iniciar seu servidor ou executar outras operações
  })
  .catch((error) => console.log("Erro durante a inicialização do Data Source:", error));