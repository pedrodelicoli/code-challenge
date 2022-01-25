const { 
  insertNew, 
  listMoviment, 
} = require('../services/transfersService');

const created = 201;
const success = 200;

const createOne = async (req, res, next) => {
    try {
      const { name, cpf, value } = req.body;  
      const id = req.userId;
      const transfer = { name, cpf, value };
      const newTransfer = await insertNew(transfer, id);
      return res.status(created).json(newTransfer);
    } catch (err) {    
      return next(err);
    }
  };

  const listAll = async (req, res, next) => {
    try {
      const id = req.userId;
      const transfers = await listMoviment(id);
      return res.status(success).json(transfers);
    } catch (err) {    
      return next(err);
    }
  };

module.exports = {
    createOne,
    listAll,    
};