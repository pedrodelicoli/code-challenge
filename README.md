# code-challenge

1 - Na rota '/users', método POST - É possível cadastrar um novo usuario com name, cpf e password. Não é possivel cadastrar 2 vezes um usuario com o mesmo cpf. Todos os campos devem ser fornecidos.

2 - Na rota '/login', método POST - Se o usuário ja for cadastrado e a senha for digitada corretamente, é possivel fazer login e receber o token para acessar outras rotas. Deve fornecer o cpf e a senha no campo password para que o login seja feito.

3 - Na rota '/deposit', método POST - Mesmo sem estar logado é possível fazer um depósito para um usuário já cadastrado. Deve fornecer o cpf e o valor no campo value para que o depósito seja realizado.

4 - Na rota '/balance', método GET - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá acesso ao seu cadastro e seu saldo.

5 - Na rota '/statement', método GET - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá acesso ao seu extrato de depósitos e transferencias.

6 - Na rota '/transfers', método POST - Para acessar essa rota, você deve fornecer no header, no campo Authorization, o token que foi gerado ao se logar. Assim, você terá poderá realizar suas transferencias. Deve ser fornecido os campos de nome, cpf e value. 