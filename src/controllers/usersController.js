const { insertUser, loginUser, depositValue, findUser } = require('../services/usersService');

const created = 201;
const success = 200;

const insertOne = async (req, res, next) => {
  try {
    const { name, cpf, password } = req.body;  
    const user = { name, cpf, password };
    const newUser = await insertUser(user);
    return res.status(created).json(newUser);
  } catch (err) {    
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { cpf, password } = req.body;  
    const user = { cpf, password };
    const token = await loginUser(user);
    return res.status(success).json(token);
  } catch (err) {    
    return next(err);
  }
};

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

const userBalance = async (req, res, next) => {
  try {
    const id = req.userId; 
    const balance = await findUser(id);
    return res.status(success).json(balance);
  } catch (err) {    
    return next(err);
  }
};

module.exports = {
  insertOne,
  login,
  userDeposit,
  userBalance
};