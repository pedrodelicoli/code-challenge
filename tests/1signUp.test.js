const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken')

const { expect } = chai;

const app = require('../src/api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);


describe('POST /users', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado nome, cpf ou senha', () => {
    let response;
    before( async () => {
      response = await chai.request(app)
        .post('/users')
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
  describe('Quando é passado cpf em formato incorreto', () => {
    let response;
    before( async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: "Pedro",
          cpf: 22222222222,
          password: 'minhasenha'
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
    it('contém o texto "cpf is in invalid format"', () => {
      expect(response.body.message).to.be.equals('Cpf is in invalid format');
    })
  }) 
  describe('Quando é cadastrado com sucesso um novo usuário', () => {
    let response;
    before( async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: "Pedro",
          cpf: "222.222.222-22",
          password: 'minhasenha'
        });
    })

    it('retorna código 201', () => {
      expect(response).to.have.status(201);
    })
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    })
    it('resposta possui a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    })
    it('retorna o usuario"', () => {
      expect(response.body.user.name).to.be.equals("Pedro");
      expect(response.body.user.cpf).to.be.equals("222.222.222-22")
    })
}) 
});

