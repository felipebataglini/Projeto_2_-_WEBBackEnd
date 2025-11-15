# Projeto 2 - E-commerce API com Express.js
Este projeto consiste em uma API back-end para um sistema de e-commerce, desenvolvida como **Projeto 2** da disciplina de **Programação Web Back-End**. A aplicação utiliza as classes do Projeto 1 e as evolui para uma **API RESTful** completa, utilizando **Express.js**, **MongoDB** e um sistema de **autenticação baseada em sessões**.

## Funcionalidades Principais
* **API RESTful:** Endpoints para CRUD de Produtos, Pedidos e Clientes.
* **Autenticação e Sessões:** Rotina de login (`/api/auth/login`) e proteção de rotas privadas (como criar produtos ou pedidos) usando `express-session`.
* **Gerenciamento de Produtos:** API com operações de Criar, Ler, Atualizar e Deletar (CRUD) produtos.
* **Gerenciamento de Clientes:** Endpoint para registro de novos clientes e consulta de dados do usuário logado.
* **Sistema de Pedidos:** Lógica para criação de pedidos, vinculando o cliente da sessão aos produtos, com validação de estoque.
* **Validação de Dados:** Verificação de campos obrigatórios nas classes e controllers.
* **Log de Erros:** Sistema robusto que captura e armazena todas as exceções em um arquivo `error.log` para facilitar a depuração.

## Tecnologias Utilizadas
* **Node.js:** Ambiente de execução do lado do servidor.
* **Express:** Framework para a aplicação web e API.
* **express-session:** Gerenciamento de sessões para autenticação.
* **MongoDB:** Banco de dados NoSQL para armazenamento dos dados.
* **Mongoose:** Biblioteca para modelagem de objetos do MongoDB.
* **bcrypt:** Biblioteca para hashing de senhas.
* **dotenv:** Para gerenciamento de variáveis de ambiente.

## Instalação e Execução
Siga os passos abaixo para executar o projeto localmente.

### 1. Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 14 ou superior)
* [MongoDB](https://www.mongodb.com/try/download/community) rodando na sua máquina.
* [Postman](https://dl.pstmn.io/download/latest/win64) **Recomendado** para manuseio da API.

### 2. Clone o Repositório
```sh
git clone https://github.com/felipebataglini/Projeto_2_-_WEBBackEnd
cd <nome-da-pasta>
```

### 3. Instale as Dependências
Execute o comando abaixo na pasta raiz do projeto para instalar as bibliotecas necessárias.
```sh
npm install
```

### 4. Configure as Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do projeto e adicione o seguinte conteúdo. Você pode alterar os valores se sua configuração for diferente.
```sh
# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=27017
DB_NAME=ecommerceDB

# Configuração do Servidor
PORT=3000
```

### 5. Iniciando o servidor
Para iniciar o servidor da API, execute o comando abaixo no terminal:
```sh
npm start
```
O servidor estará rodando em `http://localhost:3000`.

## Como testar a API
Para testar esta API, é altamente recomendado usar uma ferramenta como o Postman ou Insomnia, pois elas gerenciam automaticamente os cookies de sessão necessários para a autenticação.
Eu utilizei para os testes o Postman, e indico o uso dele, conforme pré-requisito acima.

### 1. Registrar um Novo Cliente (Público)
POST `http://localhost:3000/api/clientes/registrar`
Body (JSON):
```sh
{
  "nome": "Felipe Bataglini",
  "email": "felipe@teste.com",
  "password": "senha123",
  "endereco": {
    "rua": "Rua X",
    "numero": "100",
    "cidade": "Cidade Y",
    "estado": "SP",
    "cep": "12345-678"
  }
}
```

### 2. Fazer login (Público)
POST `http://localhost:3000/api/auth/login`
Body (JSON):
```sh
{
  "email": "felipe@teste.com",
  "password": "senha123"
}
```

### 3. Criar um Produto (Rota Protegida)
_Esta rota só funcionará se você estiver logado (passo 2)._
POST `http://localhost:3000/api/produtos`
Body (JSON):
```sh
{
  "nome": "Notebook Gamer",
  "descricao": "Notebook de alta performance",
  "preco": 5000,
  "quantidadeEstoque": 10,
  "categoria": "Eletrônicos"
}
```

### 4. Criar um Pedido (Rota Protegida)
_Esta rota usa o ID do usuário logado (da sessão) e o ID do produto._
POST `http://localhost:3000/api/pedidos`
Body (JSON):
```sh
{
  "itens": [
    {
      "produtoId": "ID_DO_PRODUTO_CRIADO_NO_PASSO_3",
      "quantidade": 1
    }
  ]
}
```

### 5. Listar produtos (Público)
GET `http://localhost:3000/api/produtos`

### 6. Ver Meus Pedidos (Rota Protegida)
GET `http://localhost:3000/api/pedidos/meuspedidos`

### 7. Fazer Logout (Protegido)
POST `http://localhost:3000/api/auth/logout`
