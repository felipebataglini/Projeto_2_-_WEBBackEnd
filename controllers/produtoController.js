/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const Produto = require('../classes/Produto');
const Logger = require('../Logger');

// CREATE
exports.createProduto = async (req, res) => {
  try {
    // A validação de campos ocorre no construtor da classe
    const produto = new Produto(req.body);
    const produtoSalvo = await produto.salvar();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    Logger.logError(error);
    res.status(400).json({ error: error.message });
  }
};

// READ (All)
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.buscarTodos();
    res.status(200).json(produtos);
  } catch (error) {
    Logger.logError(error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};

// READ (By ID)
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.buscarPorId(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
  } catch (error) {
    Logger.logError(error);
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
};

// UPDATE
exports.updateProduto = async (req, res) => {
  try {
    const produto = await Produto.atualizar(req.params.id, req.body);
    if (!produto) {
      return res.status(44).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
  } catch (error) {
    Logger.logError(error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE
exports.deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.deletar(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    Logger.logError(error);
    res.status(500).json({ error: 'Erro ao deletar produto.' });
  }
};