const { Server } = require("socket.io");

let io;

// Função utilitária para converter valores booleanos do SQLite
const convertBooleanFields = (tema) => {
  if (!tema) return tema;
  
  return {
    ...tema,
    ativo: Boolean(tema.ativo),
  };
};

// Função para converter array de temas
const convertBooleanFieldsArray = (temas) => {
  return temas.map(convertBooleanFields);
};

function setupWebsocket(server, db) {
  console.log('🔌 Configurando WebSocket...');
  
  io = new Server(server, {
    cors: { 
      origin: [ "*"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"]
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", async (socket) => {
    console.log(`🔌 Cliente conectado: ${socket.id}`);

    try {
      const temas = await db("temas").where({ ativo: true }).orderBy("dataCriacao", "desc");
      
      // Converter valores booleanos antes de enviar
      const temasConvertidos = convertBooleanFieldsArray(temas);
      
      console.log(`📋 Enviando ${temasConvertidos.length} temas para o cliente ${socket.id}`);
      socket.emit("listaTemas", temasConvertidos);
    } catch (err) {
      console.error("❌ Erro ao carregar temas:", err);
    }

    socket.on("disconnect", (reason) => {
      console.log(`❌ Cliente desconectado: ${socket.id}. Motivo: ${reason}`);
    });
  });

  console.log('✅ WebSocket configurado com sucesso');
}

function sendMessage(event, data) {
  if (io) {
    // Converter valores booleanos se for um tema
    let dataToSend = data;
    if (data && typeof data === 'object') {
      if (Array.isArray(data)) {
        dataToSend = convertBooleanFieldsArray(data);
      } else if (data.ativo !== undefined) {
        dataToSend = convertBooleanFields(data);
      }
    }
    
    console.log(`📡 Enviando evento "${event}" para todos os clientes:`, dataToSend);
    io.emit(event, dataToSend);
  } else {
    console.warn("⚠️ WebSocket não está inicializado");
  }
}

module.exports = { setupWebsocket, sendMessage };
