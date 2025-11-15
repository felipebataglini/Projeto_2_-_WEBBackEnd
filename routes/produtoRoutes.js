/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Rotas Públicas (não precisam de login)
// [GET] /api/produtos
router.get('/', produtoController.getAllProdutos);
// [GET] /api/produtos/:id
router.get('/:id', produtoController.getProdutoById);


// Rotas Protegidas (precisam de login via sessão)
// [POST] /api/produtos
router.post('/', isAuthenticated, produtoController.createProduto);
// [PUT] /api/produtos/:id
router.put('/:id', isAuthenticated, produtoController.updateProduto);
// [DELETE] /api/produtos/:id
router.delete('/:id', isAuthenticated, produtoController.deleteProduto);

module.exports = router;