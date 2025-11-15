/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// [POST] /api/auth/login
router.post('/login', authController.login);

// [POST] /api/auth/logout
router.post('/logout', authController.logout);

// [GET] /api/auth/session
router.get('/session', authController.checkSession);

module.exports = router;