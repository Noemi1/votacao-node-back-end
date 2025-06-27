# 📡 API WebSocket

API em Node.js com suporte a WebSocket via Socket.IO, persistência em SQLite3 com Knex.js e validação com Zod.
<!-- https://github.com/robertosousa1/fiap-app-react-01/blob/appCompleto/package.json -->
---

## ✅ Tecnologias e bibliotecas utilizadas

| Tecnologia          | Finalidade                                 |
| ------------------- | ------------------------------------------ |
| **Express**         | Framework web para rotas e middlewares     |
| **Socket.IO**       | Comunicação em tempo real (WebSocket)      |
| **Knex.js**         | Query builder SQL + controle de migrations |
| **SQLite3**         | Banco de dados local e leve                |
| **Zod**             | Validação de dados de entrada              |
| **@faker-js/faker** | Geração de dados fictícios para seeds      |

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório e instale as dependências
```bash
git clone <URL_DO_REPO>
cd api-websocket
npm install
npx knex migrate:latest --env development
npx knex seed:run --env development
npm start