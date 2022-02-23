# code-challenge

1 - Na rota '/users', método POST - É possível cadastrar um novo usuario com name, cpf e password. Não é possivel cadastrar 2 vezes um usuario com o mesmo cpf. Todos os campos devem ser fornecidos.

2 - Na rota '/login', método POST - Se o usuário ja for cadastrado e a senha for digitada corretamente, é possivel fazer login e receber o token para acessar outras rotas. Deve fornecer o cpf e a senha no campo password para que o login seja feito.

3 - Na rota '/deposit', método POST - Mesmo sem estar logado é possível fazer um depósito para um usuário já cadastrado. Deve fornecer o cpf e o valor no campo value para que o depósito seja realizado.

4 - Na rota '/balance', método GET - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá acesso ao seu cadastro e seu saldo.

5 - Na rota '/statement', método GET - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá acesso ao seu extrato de depósitos e transferencias.

6 - Na rota '/transfers', método POST - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá poderá realizar suas transferencias. Deve ser fornecido os campos de nome, cpf e value. 

# Bem-vindos ao repositório do Trade App

## Contexto

---

Esse projeto foi desenvolvido para uma vaga de fullstack.

A proposta era desenvolver uma API de banco, onde o usuário pode se cadastrar, fazer login e efetuar seus depósitos e transferência.

---

## Como instalar

Pre-requisitos para rodar o projeto: 
- mongoDB
- NPM

Copie o ssh do projeto `git@github.com:pedrodelicoli/code-challenge.git`

* Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

  * `git clone git@github.com:pedrodelicoli/code-challenge.git`
  * `cd code-challenge`
  * `npm install`
  
  O backend está configurado para rodar na porta local 3001. Caso deseje utilizar outra porta utilize o arquivo `.env` para trocar para a porta desejada.

---

## Modo de utilização

A API consta com 6 rotas:

1 - Na rota '/users', método POST - É possível cadastrar um novo usuario com name, cpf e password. Não é possivel cadastrar 2 vezes um usuario com o mesmo cpf. Todos os campos devem ser fornecidos.

2 - Na rota '/login', método POST - Se o usuário ja for cadastrado e a senha for digitada corretamente, é possivel fazer login e receber o token para acessar outras rotas. Deve fornecer o cpf e a senha no campo password para que o login seja feito.

3 - Na rota '/deposit', método POST - Mesmo sem estar logado é possível fazer um depósito para um usuário já cadastrado. Deve fornecer o cpf e o valor no campo value para que o depósito seja realizado.

4 - Na rota '/balance', método GET - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá acesso ao seu cadastro e seu saldo.

5 - Na rota '/statement', método GET - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá acesso ao seu extrato de depósitos e transferencias.

6 - Na rota '/transfers', método POST - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá poderá realizar suas transferencias. Deve ser fornecido os campos de nome, cpf e value. 

---

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica, Mocha/Chai para a criação dos teste unitários e de integração. 

---

### Banco de dados

O banco escolhido para a aplicação foi `Mongodb`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura e pela robustes para lidar com grande volume de requisições.

---

## Próximos passos

* Formatar código para melhorar manutenção

---

## Contato

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div>
    <h2> Pedro Delicoli </h2>
  <div style="display: flex;align-items: center;">
    <img src="./frontend/images/github-logo.png" alt="LinkedIn" style="width:20px;"/> https://github.com/pedrodelicoli
  </div>
  <div style="display: flex;align-items: center;">
    <img src="./frontend/images/linkedin-logo.png" alt="LinkedIn" style="width:20px;"/> https://www.linkedin.com/in/pedrodelicoli/
  </div>
  <br/>
  Email: pedrodelicoli@hotmail.com  
<br/>

---
