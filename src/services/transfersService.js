const Joi = require('joi');
const { 
  insertTransfer,  
} = require('../models/tranfersModel');
const { findById, insertValue, findByCpf } = require('../models/usersModel');
const { errorHandler } = require('../utils/errorhandler');

const erro400 = 400;

const errorName = {
  entries: 'Invalid entries. Try again.', 
  value: 'tranfers limit to 2000',
  amount: 'insufficient funds'
};

const transferObj = Joi.object({
    name: Joi.required(),
    cpf: Joi.required(),
    value: Joi.required(),
  });

const insertNew = async (transfer, id) => {
    const { error } = transferObj.validate(transfer);
    if (error) throw errorHandler(erro400, errorName.entries); 
    if (transfer.value > 2000) throw errorHandler(erro400, errorName.value); 
    const user = await findById(id);
    if(transfer.value > user.amount) throw errorHandler(erro400, errorName.amount); 
    await insertValue(user._id, -transfer.value)
    const userExist = await findByCpf(transfer.cpf);
    if (userExist) await insertValue(userExist._id, transfer.value); 
    const newTransfer = {
      ...transfer,
      userId: id,
    };
    const transferId = await insertTransfer(newTransfer);
    return { 
      Transfer: {
        _id: transferId,
        ...newTransfer,
      },  
    };    
  };
  

module.exports = { insertNew };  