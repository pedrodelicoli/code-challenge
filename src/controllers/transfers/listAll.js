const listMoviment = require('../../services/transfers/listMoviment');

const success = 200;

const listAll = async (req, res, next) => {
  try {
    const id = req.userId;
    const transfers = await listMoviment(id);
    return res.status(success).json(transfers);
  } catch (err) {    
    return next(err);
  }
};

module.exports = listAll;
