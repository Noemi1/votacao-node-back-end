const connection = require("../database/connection");
const { temaSchema } = require("../validators/temaValidator");
const { sendMessage } = require("../websocket");

// Função utilitária para converter valores booleanos do SQLite
const convertBooleanFields = (tema) => {
  if (!tema) return tema;
  
  return {
    ...tema,
    ativo: Boolean(tema.ativo),
    // Converter outros campos booleanos se necessário
  };
};

// Função para converter array de temas
const convertBooleanFieldsArray = (temas) => {
  return temas.map(convertBooleanFields);
};

// Listar todos os temas
const getList = async (req, res) => {
  const list = await connection("temas").orderBy("dataCriacao", "desc");
  
  // Converter valores booleanos
  const temasConvertidos = convertBooleanFieldsArray(list);
  
  return res.json(temasConvertidos);
};

// Obter um tema pelo ID
const getItem = async (req, res) => {
  const { id } = req.params;

  const tema = await connection("temas").where({ id }).first();

  if (!tema) return res.status(404).json({ erro: "Tema não encontrado" });

  // Converter valores booleanos
  const temaConvertido = convertBooleanFields(tema);

  return res.json(temaConvertido);
};

// Criar um novo tema
const create = async (req, res) => {
  const validation = temaSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(validation.error.errors);
  }

  const tema = validation.data;

  const [id] = await connection("temas").insert({
    nome: tema.nome,
    descricao: tema.descricao,
    foto: tema.foto,
    dataCriacao: new Date().toISOString(),
    ativo: true,
    dataInativo: null,
    ipInativacao: null,
  });

  const temaCriado = convertBooleanFields({ id, ...tema, ativo: true });

  sendMessage("newTema", temaCriado);
  return res.status(201).json(temaCriado);
};

// Editar nome, descrição e foto de um tema
const update = async (req, res) => {
  const { id } = req.params;

  const tema = await connection("temas").where({ id }).first();
  if (!tema) return res.status(404).json({ erro: "Tema não encontrado" });

  const data = req.body;

  const updatedFields = {
    nome: data.nome ?? tema.nome,
    descricao: data.descricao ?? tema.descricao,
    foto: data.foto ?? tema.foto,
  };

  await connection("temas").where({ id }).update(updatedFields);

  const temaAtualizado = convertBooleanFields({ id, ...updatedFields, ativo: tema.ativo });

  sendMessage("updateTema", temaAtualizado);
  return res.status(200).json(temaAtualizado);
};

// Inativar tema (salvando IP e data)
const inativar = async (req, res) => {
  const { id } = req.params;
  
  const tema = await connection("temas").where({ id }).first();
  if (!tema) return res.status(404).json({ erro: "Tema não encontrado" });
  
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  await connection("temas").where({ id }).update({
    ativo: false,
    dataInativo: new Date().toISOString(),
    ipInativacao: ip,
  });

  // Buscar o tema atualizado
  const temaAtualizado = await connection("temas").where({ id }).first();
  const temaConvertido = convertBooleanFields(temaAtualizado);

  sendMessage("temaInativado", temaConvertido);
  return res.status(200).json(temaConvertido);
};

// Ativar tema (limpando campos de inativação)
const ativar = async (req, res) => {
  const { id } = req.params;

  const tema = await connection("temas").where({ id }).first();
  if (!tema) return res.status(404).json({ erro: "Tema não encontrado" });

  await connection("temas").where({ id }).update({
    ativo: true,
    dataInativo: null,
    ipInativacao: null,
  });

  // Buscar o tema atualizado
  const temaAtualizado = await connection("temas").where({ id }).first();
  const temaConvertido = convertBooleanFields(temaAtualizado);

  sendMessage("temaAtivado", temaConvertido);
  return res.status(200).json(temaConvertido);
};

module.exports = {
  getList,
  getItem,
  create,
  update,
  inativar,
  ativar,
};
