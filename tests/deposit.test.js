const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken')

const { expect } = chai;

const app = require('../src/api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

describe('POST /deposit', () => {
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });
  
    after(() => {
      MongoClient.connect.restore();      
    });
  
    describe('Quando não é passado cpf ou valor', () => {
      let response;
      before( async () => {
        response = await chai.request(app)
          .post('/deposit')
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
          .post('/deposit')
          .send({
            cpf: "223.222.222-22",
            value: '500'
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
    describe('Quando o valor é menor que zero', () => {
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
          .post('/deposit')
          .send({
            cpf: "222.222.222-22",
            value: '-5'
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
      it('contém o texto "Incorrect value"', () => {
        expect(response.body.message).to.be.equals('Incorrect value');
      })
    })
    describe('Quando é feito depósito com sucesso', () => {
      let response;
      let statement
      before( async () => {
        response = await chai.request(app)
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
        statement = await chai.request(app)
          .get('/statement')
          .set('authorization', token)                
      })
  
      it('retorna código 201', () => {
        expect(response).to.have.status(201);
      })
      it('resposta é um objeto', () => {
        expect(response.body).to.be.an('object');
      })
      it('resposta possui a propriedade "role" indentificando depósito', () => {
        expect(response.body).to.have.property('role');
        expect(response.body.role).to.be.equal('deposit');
      })
      it('contém o cpf do benefiário e o valor depositado', () => {
        expect(response.body.cpf).to.be.equals("222.222.222-22");
        expect(response.body.value).to.be.equals("500");
      })
      it('fica registrado no extrato do usuario', () => {
        const [ deposit ] = statement.body; 
        const { _id } = deposit
        expect(response.body._id).to.be.equal(_id);
      })
    })    
});