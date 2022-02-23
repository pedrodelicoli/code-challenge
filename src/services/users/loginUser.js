const Joi = require('joi');
const jwt = require('jsonwebtoken');
const findByCpf = require('../../models/users/findByCpf');
const errorHandler = require('../../utils/errorhandler');

const erro401 = 401;

const secret = 'seusecretdetoken';

const errorName = {
  exists: 'CPF already registered',
  entries: 'Invalid entries. Try again.',
  format: 'Cpf is in invalid format', 
  login: 'All fields must be filled',
  auth: 'User not found',
  password: 'Incorrect Password',
  deposit: 'Incorrect value',   
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
  if (userExist.password !== password) throw errorHandler(erro401, errorName.password);
  const token = jwt.sign({ data: user.cpf }, secret, jwtConfig);
  return { token }; 
};

module.exports = loginUser;
