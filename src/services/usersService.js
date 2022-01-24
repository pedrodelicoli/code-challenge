const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { createUser, findByCpf, insertValue, findById } = require('../models/usersModel');
const { errorHandler } = require('../utils/errorhandler');

const erro400 = 400;
const erro409 = 409;
const erro401 = 401;

const secret = 'seusecretdetoken';

const errorName = {
  exists: 'CPF already registered',
  entries: 'Invalid entries. Try again.', 
  login: 'All fields must be filled',
  auth: 'Incorrect cpf or password',
  deposit: 'Incorrect cpf or value',   
};

const userObj = Joi.object({
  name: Joi.required(),
  cpf: Joi.required(),
  password: Joi.required(),  
});

const insertUser = async (user) => {
  const { name, cpf } = user;  
  const { error } = userObj.validate(user);
  if (error) throw errorHandler(erro400, errorName.entries);
  const cpfCorrect = /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/;
  const validateCpf = cpfCorrect.test(cpf);
  if (!validateCpf) throw errorHandler(erro400, errorName.entries);
  const userExist = await findByCpf(cpf);
  if (userExist !== null) throw errorHandler(erro409, errorName.exists);
  const newUser = {
    ...user,
    amount: 0,
  }
  const userId = await createUser(newUser);
  return { 
    user: {
      _id: userId,
      name,
      cpf
    },    
  }; 
};

const userlogin = Joi.object({
  cpf: Joi.required(),
  password: Joi.required(),
});

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginUser = async (user) => {
  const { cpf, password } = user;  
  const { error } = userlogin.validate(user);
  if (error) throw errorHandler(erro401, errorName.login);
  const userExist = await findByCpf(cpf);
  if (!userExist) throw errorHandler(erro401, errorName.auth);
  if (userExist.password !== password) throw errorHandler(erro401, errorName.auth);
  const token = jwt.sign({ data: user.cpf }, secret, jwtConfig);
  return { token }; 
};

const depositObj = Joi.object({
  cpf: Joi.required(),
  value: Joi.required(),
});

const depositValue = async (deposit) => {
  const { cpf, value } = deposit;  
  const { error } = depositObj.validate(deposit);
  if (error) throw errorHandler(erro401, errorName.login);
  const userExist = await findByCpf(cpf);
  if (!userExist) throw errorHandler(erro401, errorName.deposit);
  if (value <= 0) throw errorHandler(erro401, errorName.deposit);
  console.log(userExist._id)
  await insertValue(userExist._id, value)
  return {
    cpf,
    value
  }
};

const findUser = async (id) => {
  const user = await findById(id);
  return user;
};



module.exports = {
  insertUser,
  loginUser,
  depositValue, 
  findUser 
};