/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

/**
 * Middleware para verificar se o usuário está autenticado via sessão
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // Usuário está logado, pode prosseguir
    return next();
  }
  
  // Usuário não está logado
  res.status(401).json({ error: 'Acesso não autorizado. Por favor, faça o login.' });
};