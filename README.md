# Users Microservice (users-ms)

Um microserviço para gerenciamento de usuários desenvolvido com Node.js, TypeScript e Express, seguindo os princípios da Clean Architecture.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução
- **TypeScript**: Linguagem de programação
- **Express**: Framework web
- **TypeORM**: ORM (Object-Relational Mapping)
- **SQLite**: Banco de dados
- **JWT**: Autenticação baseada em tokens
- **Bcrypt**: Criptografia de senhas
- **Jest**: Framework de testes

## Arquitetura

O projeto segue os princípios da Clean Architecture, organizando o código em camadas com responsabilidades bem definidas:

### Camadas da Aplicação

1. **Domain**: Contém as regras de negócio e entidades principais
   - `entities`: Definição das entidades de domínio (User)
   - `interfaces`: Contratos para serviços externos
   - `repositories`: Interfaces para acesso a dados
   - `usecases`: Implementação dos casos de uso da aplicação

2. **Infrastructure (infra)**: Implementações concretas de interfaces
   - `db`: Configurações e implementações do banco de dados
   - `bcrypt`: Implementação de criptografia
   - `jwt`: Implementação de autenticação

3. **Interface**: Camada de apresentação e comunicação
   - `http`: Controladores, rotas e middlewares
   - `utils`: Utilitários como tratamento de erros

### Classes Chave

- `User`: Entidade principal que representa um usuário
- `UserController`: Gerencia requisições HTTP relacionadas a usuários
- `UserRepository`: Implementa operações de persistência de usuários
- `CreateUserUseCase`, `LoginUserUseCase`, etc.: Implementam a lógica de negócio

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```

### Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   DB_TYPE=sqlite
   DB_DATABASE=database.sqlite
   NODE_ENV=development
   JWT_SECRET=seu_segredo_jwt
   ```

### Scripts Disponíveis

- **Desenvolvimento**: Inicia o servidor com recarga automática
  ```
  npm run dev
  ```

- **Build**: Compila o código TypeScript
  ```
  npm run build
  ```

- **Produção**: Compila e inicia o servidor
  ```
  npm start
  ```

- **Testes**: Executa os testes unitários
  ```
  npm test
  ```

## API Endpoints

### Usuários

- `GET /users`: Lista todos os usuários
- `POST /users/create`: Cria um novo usuário
- `GET /users/:id`: Busca um usuário por ID
- `PUT /users/:id`: Atualiza um usuário
- `DELETE /users/:id`: Remove um usuário

### Autenticação

- `POST /auth/login`: Autentica um usuário e retorna um token JWT