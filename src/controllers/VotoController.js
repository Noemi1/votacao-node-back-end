const connection = require("../database/connection");
const { sendMessage } = require("../websocket");

// Pegar o IP real do cliente
function getClientIp(req) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0].trim();
    }
    return req.socket.remoteAddress;
}

// Registrar um novo voto
const votar = async (req, res) => {
    const { idTema } = req.params;
    const ip = getClientIp(req);

    // Verifica se o tema está ativo
    const tema = await connection("temas").where({ id: idTema, ativo: true }).first();
    if (!tema) {
        return res.status(400).json({ erro: "Tema inativo ou inexistente" });
    }

    // Salva o voto
    const [id] = await connection("votos").insert({
        idTema,
        ip,
        dataHora: new Date().toISOString(),
    });

    // Atualiza e emite a contagem de votos por tema
    const totais = await connection("votos")
        .select("idTema")
        .where({ idTema: idTema })
        .count("id as total")
        .groupBy("idTema");

    // Emitir evento WebSocket
    sendMessage("votoRegistrado", { 
        id, 
        idTema, 
        ip,
        totalVotos: totais[0]?.total || 0 
    });

    return res.status(201).json({ id, idTema, ip });
};

// Listar todos os votos de um tema
const listarVotos = async (req, res) => {
    const { idTema } = req.params;

    const votos = await connection("votos")
        .select("*")
        .where({ idTema: idTema })
        .orderBy("dataHora", "desc");

    return res.json(votos);
};

// Listar total de votos por tema
const totaisPorTema = async (req, res) => {
    const { idTema } = req.params;

    const totais = await connection("votos")
        .select("idTema")
        .where({ idTema: idTema })
        .count("id as total")
        .groupBy("idTema");
    return res.json(totais);
};

module.exports = {
    votar,
    listarVotos,
    totaisPorTema,
};