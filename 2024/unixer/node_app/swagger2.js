/**
 * @swagger
 * /api/v2/get_readme:
 *   get:
 *     summary: Retorna conteudo do README.txt.
 *     tags: [API v2]
 *     responses:
 *       200:
 *         description: Retorna uma mensagem de desenvolvimento da API v2.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 README.txt:
 *                   type: string
 *                   example: "exemplo"
 *       403:
 *         description: Acesso negado se a requisição não vier de localhost.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied"
 */