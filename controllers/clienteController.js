/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const Cliente = require('../classes/Cliente');
const Logger = require('../Logger');

// CREATE (Registro)
exports.registerCliente = async (req, res) => {
  try {
    // A validação de campos ocorre no construtor da classe
    const cliente = new Cliente(req.body);
    const clienteSalvo = await cliente.salvar();
    
    // Converte para objeto para remover a senha antes de retornar
    const clienteObj = clienteSalvo.toObject();
    delete clienteObj.password;

    res.status(201).json(clienteObj);
  } catch (error) {
    Logger.logError(error);
    res.status(400).json({ error: error.message });
  }
};

// READ (Meus dados)
exports.getMe = async (req, res) => {
  try {
    // Pega o ID da sessão
    const clienteId = req.session.user.id;
    const cliente = await Cliente.buscarPorId(clienteId);
    
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    Logger.logError(error);
    res.status(500).json({ error: 'Erro ao buscar dados do cliente.' });
  }
};