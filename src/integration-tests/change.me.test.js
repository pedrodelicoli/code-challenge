const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai;

const server = require('../api/server');
const { getConnection } = require('./connectionMock');
const MongoClient = require('mongodb/lib/mongo_client');
const { convertErrorOutput } = require('shelljs/src/common');

chai.use(chaiHttp);


describe('POST /api/login', () => {
    let connectionMock;
    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect().restore();
    });

   describe('Quando não é passado email, senha ou nome', () => {
       let response;
       before(() => {
           response = chai.request(server)
             .post('/users')
             .send({})
       })
   }) 
});
