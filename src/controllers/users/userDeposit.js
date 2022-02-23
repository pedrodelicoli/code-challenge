const depositValue = require('../../services/users/depositValue');

const userDeposit = async (req, res, next) => {
    try {
      const { cpf, value } = req.body;  
      const deposit = { cpf, value };
      const newDeposit = await depositValue(deposit);
      return res.status(created).json(newDeposit);
    } catch (err) {    
      return next(err);
    }
  };

  module.exports = userDeposit;
  