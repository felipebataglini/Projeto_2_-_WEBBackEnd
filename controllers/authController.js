/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const Cliente = require('../classes/Cliente');
const Logger = require('../Logger');

// Rotina de Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação de campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const cliente = await Cliente.login(email, password);
    
    // Armazena o usuário na sessão
    req.session.user = {
      id: cliente._id,
      nome: cliente.nome,
      email: cliente.email
    };

    res.status(200).json({ message: 'Login bem-sucedido!', user: req.session.user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Rotina de Logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      Logger.logError(err);
      return res.status(500).json({ error: 'Não foi possível fazer logout.' });
    }
    res.clearCookie('connect.sid'); // Limpa o cookie da sessão
    res.status(200).json({ message: 'Logout bem-sucedido.' });
  });
};

// Verifica a sessão atual
exports.checkSession = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Nenhum usuário autenticado.' });
  }
};