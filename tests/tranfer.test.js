const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken')

const { expect } = chai;

const app = require('../src/api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);


describe('POST /transfers', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);    
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Não é possivel realizar transferência sem estar logado', () => {
    let response;
    before( async () => {
      response = await chai.request(app)
        .post('/transfers')
        .set('authorization', '')        
    })

    it('retorna código 401', () => {
      expect(response).to.have.status(401);
    })
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    })
    it('resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    })
    it('contém o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    })
  }) 

  describe('Quando não é passado nome, cpf ou valor', () => {
    let response;
    before( async () => {
      const token = await chai.request(app)
      .post('/login')
      .send({
      cpf: "222.222.222-22",
      password: 'minhasenha'
      })
      .then((res) => res.body.token); 
      response = await chai.request(app)
        .post('/transfers')
        .set('authorization', token)
        .send({});
      })

    it('retorna código 400', () => {
      expect(response).to.have.status(400);
    })
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    })
    it('resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    })
    it('contém o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    })
  }) 
  describe('Quando o valor da transferencia é maior que 2000', () => {
    let response;
    before( async () => {
      const token = await chai.request(app)
      .post('/login')
      .send({
      cpf: "222.222.222-22",
      password: 'minhasenha'
      })
      .then((res) => res.body.token);      
      response = await chai.request(app)
        .post('/transfers')
        .set('authorization', token)
        .send({
          name: "Pedro",
          cpf: "222.222.222-22",
          value: "2500"
        });
    })

    it('retorna código 400', () => {
      expect(response).to.have.status(400);
    })
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    })
    it('resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    })
    it('contém o texto "Tranfers limit to 2000"', () => {
      expect(response.body.message).to.be.equals('Tranfers limit to 2000');
    })
  }) 
  describe('Quando o valor é maior que o saldo do usuario', () => {
    let response;
    before( async () => {
      const token = await chai.request(app)
      .post('/login')
      .send({
      cpf: "222.222.222-22",
      password: 'minhasenha'
      })
      .then((res) => res.body.token);      
      response = await chai.request(app)
        .post('/transfers')
        .set('authorization', token)
        .send({
          name: "Paulo",
          cpf: "223.223.223-23",
          value: "1500"
        });
    })

    it('retorna código 400', () => {
      expect(response).to.have.status(400);
    })
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    })
    it('resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    })
    it('contém o texto "insufficient funds"', () => {
      expect(response.body.message).to.be.equals('insufficient funds');
    })
  }) 
  describe('Quando a transferencia é feita com sucesso', () => {
    let response;
    before( async () => {
      await chai.request(app)
          .post('/deposit')
          .send({
            cpf: "222.222.222-22",
            value: '500'
          });
      const token = await chai.request(app)
      .post('/login')
      .send({
      cpf: "222.222.222-22",
      password: 'minhasenha'
      })
      .then((res) => res.body.token);      
      response = await chai.request(app)
        .post('/transfers')
        .set('authorization', token)
        .send({
          name: "Paulo",
          cpf: "223.223.223-23",
          value: "500"
        });        
    })

    it('retorna código 201', () => {
      expect(response).to.have.status(201);
    })
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    })
    it('resposta possui a propriedade "role" indicando que é uma transferência', () => {
      const { Transfer } = response.body
      expect(Transfer).to.have.property('role');
      expect(Transfer.role).to.be.equal('transfer');
    })
    it('contém o cpf do benefiário e o valor depositado', () => {
      const { Transfer } = response.body
      expect(Transfer.cpf).to.be.equal('223.223.223-23');
      expect(Transfer.value).to.be.equal('500');
    })
  }) 
});
