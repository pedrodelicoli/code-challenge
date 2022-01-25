const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken')

const { expect } = chai;

const app = require('../src/api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);


describe('POST /login', () => {
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });
  
    after(() => {
      MongoClient.connect.restore();      
    });
  
    describe('Quando não é passado cpf ou senha', () => {
      let response;
      before( async () => {
        response = await chai.request(app)
          .post('/login')
          .send({});
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
      it('contém o texto "All fields must be filled"', () => {
        expect(response.body.message).to.be.equals('All fields must be filled');
      })
    }) 
    describe('Quando o usuario não existe', () => {
      let response;
      before( async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            cpf: "223.222.222-22",
            password: 'minhasenha'
          });
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
      it('contém o texto "User not found"', () => {
        expect(response.body.message).to.be.equals('User not found');
      })
    }) 
    describe('Quando a senha esta incorreta', () => {
      let response;
      before( async () => {
        await chai.request(app)
        .post('/users')
        .send({
          name: "Pedro",
          cpf: "222.222.222-22",
          password: 'minhasenha'
        });  
        response = await chai.request(app)
          .post('/login')
          .send({
            cpf: "222.222.222-22",
            password: 'minhsenha'
          });
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
      it('contém o texto "Incorrect Password"', () => {
        expect(response.body.message).to.be.equals('Incorrect Password');
      })
    })
    describe('Quando é feito login com sucesso', () => {
      let response;
      before( async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            cpf: "222.222.222-22",
            password: 'minhasenha'
          });
      })
  
      it('retorna código 401', () => {
        expect(response).to.have.status(200);
      })
      it('resposta é um objeto', () => {
        expect(response.body).to.be.an('object');
      })
      it('resposta possui a propriedade "token"', () => {
        expect(response.body).to.have.property('token');
      })
      it('contém um token válido', () => {
        const { token } = response.body;
        const userCpf = jwt.decode(token);
        expect(userCpf.data).to.be.equals("222.222.222-22");
      })
    })
  });