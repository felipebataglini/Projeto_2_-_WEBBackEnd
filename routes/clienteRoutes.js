/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Rota pública para registrar um novo cliente
// [POST] /api/clientes/registrar
router.post('/registrar', clienteController.registerCliente);

// Rota protegida para o cliente logado ver seus próprios dados
// [GET] /api/clientes/me
router.get('/me', isAuthenticated, clienteController.getMe);

module.exports = router;