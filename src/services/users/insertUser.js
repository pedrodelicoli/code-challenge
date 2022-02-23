const Joi = require('joi');
const createUser = require('../../models/users/createUser');
const findByCpf = require('../../models/users/findByCpf');
const errorHandler = require('../../utils/errorhandler');

const erro400 = 400;
const erro409 = 409;

const errorName = {
  exists: 'CPF already registered',
  entries: 'Invalid entries. Try again.',
  format: 'Cpf is in invalid format', 
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
  if (!validateCpf) throw errorHandler(erro400, errorName.format);
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

module.exports = insertUser;
