/* Nome: Felipe de Oliveira Guimarães Bataglini
RA: 2475421
Turma: EC48B - C81
*/

const express = require('express');
const session = require('express-session');
const connectDB = require('./database');
require('dotenv').config();

// Importa as rotas
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // Rota para clientes

// Conecta ao banco de dados
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permite entender dados de formulário

// Configuração da Sessão
app.use(session({
  secret: 'seu-segredo-de-sessao-muito-seguro', // Troque por uma string aleatória
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Use 'true' se estiver em HTTPS
    maxAge: 3600000 // 1 hora de duração
  }
}));

// Rotas Principais
app.get('/', (req, res) => {
  res.json({ message: 'API do Projeto 2 de E-commerce no ar!' });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/clientes', clienteRoutes); // Rota para clientes

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando em http://localhost:${PORT}`);
});