const { z } = require("zod");

const temaSchema = z.object({
    nome: z
        .string()
        .min(1, "O nome do tema é obrigatório")
        .max(255, "O nome do tema deve ter no máximo 255 caracteres"),

    descricao: z
        .string()
        .min(1, "A descrição é obrigatória")
        .max(1000, "A descrição deve ter no máximo 1000 caracteres"),

    foto: z
        .string()
        .url("A URL da foto deve ser válida"),
});

module.exports = { temaSchema };
