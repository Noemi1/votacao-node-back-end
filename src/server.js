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

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'}`);
  next();
});

// Configurar CORS antes do WebSocket
app.use(cors({
  origin: [
    "http://localhost:8080", // Desenvolvimento local
    "https://purple-coast-0153c791e.2.azurestaticapps.net", // Azure Static Web Apps
    process.env.FRONTEND_URL // URL do frontend via variável de ambiente
  ].filter(Boolean), // Remove valores undefined/null
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200 // Para compatibilidade com alguns navegadores
}));

app.use(express.json());

// Configurar WebSocket após CORS
setupWebsocket(server, connection);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      frontendUrl: process.env.FRONTEND_URL,
      allowedOrigins: [
        "http://localhost:8080",
        "https://purple-coast-0153c791e.2.azurestaticapps.net",
        process.env.FRONTEND_URL
      ].filter(Boolean)
    }
  });
});

app.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação da API disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check disponível em: http://localhost:${PORT}/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 FRONTEND_URL: ${process.env.FRONTEND_URL || 'Não configurado'}`);
});
