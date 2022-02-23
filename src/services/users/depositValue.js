const Joi = require('joi');
const findByCpf = require('../../models/users/findByCpf');
const insertValue = require('../../models/users/insertValue');
const insertTransfer = require('../../models/transfers/insertTransfer')
const errorHandler = require('../../utils/errorhandler');

const erro401 = 401;

const depositObj = Joi.object({
    cpf: Joi.required(),
    value: Joi.required(),
});

const depositValue = async (deposit) => {
    const { cpf, value } = deposit;  
    const { error } = depositObj.validate(deposit);
    if (error) throw errorHandler(erro401, errorName.login);
    const userExist = await findByCpf(cpf);
    if (!userExist) throw errorHandler(erro401, errorName.auth);
    if (value <= 0) throw errorHandler(erro401, errorName.deposit);
    await insertValue(userExist._id, value)
    const newMoviment = {
      name: userExist.name,
      cpf,
      value,
      userId: userExist._id,
      role: 'deposit',  
    }
    await insertTransfer(newMoviment);
    return newMoviment;
  };
  
  module.exports = depositValue;