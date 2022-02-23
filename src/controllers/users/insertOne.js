const insertUser = require('../../services/users/insertUser');

const created = 201;

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

module.exports = insertOne;
  