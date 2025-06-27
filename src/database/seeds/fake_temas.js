exports.seed = async function (knex) {
  // Remove dados existentes da tabela 'temas'
  await knex("temas").del();

  // Data atual como data de criação
  const now = new Date().toISOString();

  const temas = [
    {
      nome: "Inteligência Artificial na Educação",
      descricao: "Discussão sobre o uso de IA em ambientes educacionais",
      foto: "https://s2-techtudo.glbimg.com/4_VWrcopRnf26TnPMwXM_9BMq0o=/0x0:1325x900/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/u/q/pLrl0RRgKZd5Duw1AePA/design-sem-nome-9-.png",
      dataCriacao: now,
      ativo: true,
      dataInativo: null,
      ipInativacao: null
    },
    {
      nome: "Trabalho Remoto vs Presencial",
      descricao: "Vantagens e desvantagens dos modelos de trabalho",
      foto: "https://www.abcdacomunicacao.com.br/wp-content/uploads/8850ad5b-5757-48f3-b6ff-e8135aef02c7.jpeg",
      dataCriacao: now,
      ativo: true,
      dataInativo: null,
      ipInativacao: null
    },
    {
      nome: "Mudanças Climáticas",
      descricao: "Impactos ambientais e propostas de solução",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6f83MiG6KGzeGAyK-hxGQVIi7VuN0ANoRA&s",
      dataCriacao: now,
      ativo: true,
      dataInativo: null,
      ipInativacao: null
    },
    {
      nome: "Tecnologia e Privacidade",
      descricao: "Como proteger dados pessoais no mundo digital",
      foto: "https://respostas.sebrae.com.br/wp-content/uploads/2023/05/AdobeStock_489807660-959x615.jpeg",
      dataCriacao: now,
      ativo: true,
      dataInativo: null,
      ipInativacao: null
    },
    {
      nome: "Transporte Público Sustentável",
      descricao: "Ideias para tornar o transporte urbano mais verde",
      foto: "https://www.kangu.com.br/wp-content/uploads/2021/10/mobilidade-urbana-sustentavel-heading.jpg",
      dataCriacao: now,
      ativo: true,
      dataInativo: null,
      ipInativacao: null
    },
  ];

  // Inserção dos temas na tabela
  await knex("temas").insert(temas);
};
