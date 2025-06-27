const express = require("express");
const cors = require("cors");
const http = require("http");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");
const connection = require("./database/connection");

const app = express();
const server = http.createServer(app);

// Configurar CORS antes do WebSocket
app.use(cors());
/*{
  origin: ["http://localhost:8080", "*"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
})*/

app.use(express.json());

// Configurar WebSocket após CORS
setupWebsocket(server, connection);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação da API disponível em: http://localhost:${PORT}/api-docs`);
});
