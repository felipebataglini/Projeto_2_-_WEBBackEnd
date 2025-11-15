/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// TODAS as rotas de pedido exigem autenticação

// [POST] /api/pedidos
router.post('/', isAuthenticated, pedidoController.createPedido);

// [GET] /api/pedidos/meuspedidos
router.get('/meuspedidos', isAuthenticated, pedidoController.getMeusPedidos);

// [GET] /api/pedidos/:id
router.get('/:id', isAuthenticated, pedidoController.getPedidoById);

// [PUT] /api/pedidos/:id
router.put('/:id', isAuthenticated, pedidoController.updatePedidoStatus);

module.exports = router;