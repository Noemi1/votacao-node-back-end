const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Temas e Votação',
      version: '1.0.0',
      description: 'API para gerenciamento de temas e sistema de votação',
      contact: {
        name: 'Suporte',
        email: 'suporte@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Tema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do tema'
            },
            nome: {
              type: 'string',
              description: 'Nome do tema'
            },
            descricao: {
              type: 'string',
              description: 'Descrição do tema'
            },
            foto: {
              type: 'string',
              description: 'URL da foto do tema'
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do tema'
            },
            ativo: {
              type: 'boolean',
              description: 'Status de ativação do tema'
            },
            dataInativo: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Data de inativação do tema'
            },
            ipInativacao: {
              type: 'string',
              nullable: true,
              description: 'IP de quem inativou o tema'
            }
          }
        },
        Voto: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do voto'
            },
            idTema: {
              type: 'integer',
              description: 'ID do tema votado'
            },
            ip: {
              type: 'string',
              description: 'IP de quem votou'
            },
            dataHora: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora do voto'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            erro: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 