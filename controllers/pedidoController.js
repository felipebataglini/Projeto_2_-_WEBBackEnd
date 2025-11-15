/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const Pedido = require('../classes/Pedido');
const Logger = require('../Logger');

// CREATE
exports.createPedido = async (req, res) => {
  try {
    // Pega o ID do cliente da SESSÃO, não do body (mais seguro)
    const clienteId = req.session.user.id;
    
    const dadosPedido = {
      ...req.body,
      cliente: clienteId // Garante que o pedido é do usuário logado
    };

    // A validação de campos ocorre no construtor da classe
    const pedido = new Pedido(dadosPedido);
    const pedidoSalvo = await pedido.salvar();
    res.status(201).json(pedidoSalvo);
  } catch (error) {
    Logger.logError(error);
    res.status(400).json({ error: error.message });
  }
};

// READ (Pedidos do usuário logado)
exports.getMeusPedidos = async (req, res) => {
  try {
    const clienteId = req.session.user.id;
    const pedidos = await Pedido.buscarPorCliente(clienteId);
    res.status(200).json(pedidos);
  } catch (error) {
    Logger.logError(error);
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
};

// READ (By ID)
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.buscarPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    
    // Verifica se o pedido pertence ao usuário logado
    if (pedido.cliente.toString() !== req.session.user.id) {
        return res.status(403).json({ error: 'Acesso negado a este pedido.' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    Logger.logError(error);
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
};

// UPDATE (Status)
exports.updatePedidoStatus = async (req, res) => {
   try {
    // Apenas o status pode ser atualizado por este controller
    const { status } = req.body;
    if (!status) {
         return res.status(400).json({ error: 'Campo "status" é obrigatório.' });
    }

    // (Em um app real, apenas um ADMIN poderia mudar o status,
    // mas para este projeto, vamos permitir que o usuário mude)
    const pedido = await Pedido.atualizar(req.params.id, { status });
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    Logger.logError(error);
    res.status(400).json({ error: error.message });
  }
};