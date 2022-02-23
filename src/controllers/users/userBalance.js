const findUser = require('../../services/users/findUser');

const success = 200;

const userBalance = async (req, res, next) => {
  try {
    const id = req.userId; 
    const balance = await findUser(id);
    return res.status(success).json(balance);
  } catch (err) {    
    return next(err);
  }
};

module.exports = userBalance;
