const express = require("express");
const router = express.Router();

const TemaController = require("./controllers/TemaController");
const VotoController = require("./controllers/VotoController");

/**
 * @swagger
 * /tema:
 *   get:
 *     summary: Lista todos os temas
 *     description: Retorna uma lista de todos os temas ordenados por data de criação (mais recentes primeiro)
 *     tags: [Temas]
 *     responses:
 *       200:
 *         description: Lista de temas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tema'
 */
router.get("/tema", TemaController.getList);

/**
 * @swagger
 * /tema/{id}:
 *   get:
 *     summary: Obtém um tema específico
 *     description: Retorna os detalhes de um tema pelo seu ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     responses:
 *       200:
 *         description: Tema encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tema'
 *       404:
 *         description: Tema não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/tema/:id", TemaController.getItem);

/**
 * @swagger
 * /tema:
 *   post:
 *     summary: Cria um novo tema
 *     description: Cria um novo tema com nome, descrição e foto
 *     tags: [Temas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - foto
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do tema
 *               descricao:
 *                 type: string
 *                 description: Descrição do tema
 *               foto:
 *                 type: string
 *                 description: URL da foto do tema
 *     responses:
 *       201:
 *         description: Tema criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tema'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post("/tema", TemaController.create);

/**
 * @swagger
 * /tema/{id}:
 *   put:
 *     summary: Atualiza um tema
 *     description: Atualiza o nome, descrição e foto de um tema existente
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Novo nome do tema
 *               descricao:
 *                 type: string
 *                 description: Nova descrição do tema
 *               foto:
 *                 type: string
 *                 description: Nova URL da foto do tema
 *     responses:
 *       200:
 *         description: Tema atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tema'
 *       404:
 *         description: Tema não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/tema/:id", TemaController.update);

/**
 * @swagger
 * /tema/{id}/inativar:
 *   patch:
 *     summary: Inativa um tema
 *     description: Inativa um tema, salvando o IP e data de inativação
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     responses:
 *       200:
 *         description: Tema inativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 inativado:
 *                   type: boolean
 *       404:
 *         description: Tema não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/tema/:id/inativar", TemaController.inativar);

/**
 * @swagger
 * /tema/{id}/ativar:
 *   patch:
 *     summary: Ativa um tema
 *     description: Reativa um tema, limpando os campos de inativação
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     responses:
 *       200:
 *         description: Tema ativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 ativado:
 *                   type: boolean
 *       404:
 *         description: Tema não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/tema/:id/ativar", TemaController.ativar);

/**
 * @swagger
 * /votos/{idTema}:
 *   get:
 *     summary: Lista votos de um tema
 *     description: Retorna todos os votos registrados para um tema específico
 *     tags: [Votos]
 *     parameters:
 *       - in: path
 *         name: idTema
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     responses:
 *       200:
 *         description: Lista de votos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voto'
 */
router.get("/votos/:idTema", VotoController.listarVotos);

/**
 * @swagger
 * /votar/{idTema}:
 *   post:
 *     summary: Registra um voto
 *     description: Registra um novo voto para um tema específico
 *     tags: [Votos]
 *     parameters:
 *       - in: path
 *         name: idTema
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     responses:
 *       201:
 *         description: Voto registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idTema:
 *                   type: integer
 *                 ip:
 *                   type: string
 *       400:
 *         description: Tema inativo ou inexistente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/votar/:idTema", VotoController.votar);

/**
 * @swagger
 * /votos/total/{idTema}:
 *   get:
 *     summary: Obtém total de votos de um tema
 *     description: Retorna o total de votos registrados para um tema específico
 *     tags: [Votos]
 *     parameters:
 *       - in: path
 *         name: idTema
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tema
 *     responses:
 *       200:
 *         description: Total de votos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTema:
 *                     type: integer
 *                   total:
 *                     type: integer
 */
router.get("/votos/total/:idTema", VotoController.totaisPorTema);

module.exports = router;