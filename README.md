### 📡 API de Votação - Backend

API REST em Node.js com suporte a WebSocket via Socket.IO para sistema de votação de temas. Inclui persistência em SQLite3 com Knex.js, validação com Zod e documentação automática com Swagger.

#### 🚀 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| **Node.js** | Back-end |
| **Express** | Framework web para rotas e middlewares |
| **Socket.IO** | Comunicação em tempo real (WebSocket) |
| **Knex.js** | Query builder SQL + controle de migrations |
| **SQLite3** | Banco de dados local e leve |
| **Zod** | Validação de dados de entrada |
| **CORS** | Cross-Origin Resource Sharing |
| **Swagger** | Documentação automática da API |
| **Swagger UI** | Interface visual da documentação |

#### 🔧 Instalação e Configuração

#### 1. Clone o repositório
```bash
git clone https://github.com/Noemi1/votacao-node-back-end.git
cd votacao-node-back-end
```

#### 2. Instalar dependências
```npm install```

#### 3. Configure o banco de dados
```bash
# Executar migrations para criar as tabelas
npx knex migrate:latest --env development

npm install
# Executar seeds para popular com dados iniciais
npx knex seed:run --env development
```

#### 4. Iniciar servidor
```npm start```

O servidor estará rodando em `http://localhost:3000`
A documentação interativa da API está disponível em:
**http://localhost:3000/api-docs**


#### 🔌 Endpoints da API - Requisições HTTP

##### Temas

- `GET /tema`: Lista todos os temas ordenados por data de criação
- `GET /tema/:id`: Obtém um tema específico pelo ID
- `POST /tema`: Cria um novo tema
- `PUT /tema/:id`: Atualiza um tema existente
- `PATCH /tema/:id/inativar`: Inativa um tema
- `PATCH /tema/:id/ativar`: Reativa um tema

##### Votos

- `GET /votos/:idTema`: Lista todos os votos de um tema específico
- `POST /votar/:idTema`: Registra um novo voto para um tema
- `GET /votos/total/:idTema`: Obtém o total de votos de um tema

#### 🔌 Eventos WebSocket 

- `connection`: Disparado quando um cliente se conecta ao WebSocket
- `disconnect`: Disparado quando um cliente se desconecta
- `listaTemas`: Enviado automaticamente para novos clientes conectados
- `newTema`: Novo tema criado 
- `updateTema`: Tema atualizado
- `temaInativado`: Tema inativado
- `temaAtivado`: Tema ativado
- `votoRegistrado`: Disparado quando um novo voto é registrado (inclui o total de votos atualizado)

#### 🗄️ Estrutura do Banco de Dados

##### Tabela `temas`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `nome` | TEXT | Nome do tema |
| `descricao` | TEXT | Descrição do tema |
| `foto` | TEXT | URL da foto |
| `dataCriacao` | DATETIME | Data de criação |
| `ativo` | BOOLEAN | Status de ativação |
| `dataInativo` | DATETIME | Data de inativação (nullable) |
| `ipInativacao` | TEXT | IP de quem inativou (nullable) |

##### Tabela `votos`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `idTema` | INTEGER | Chave estrangeira para temas |
| `ip` | TEXT | IP de quem votou |
| `dataHora` | DATETIME | Data e hora do voto |
