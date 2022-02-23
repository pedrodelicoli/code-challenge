const loginUser = require('../../services/users/loginUser');

const success = 200;

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

module.exports = login;
  