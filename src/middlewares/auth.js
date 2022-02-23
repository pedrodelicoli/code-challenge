const jwt = require('jsonwebtoken');
const { findByCpf } = require('../models/usersModel');
const { errorHandler } = require('../utils/errorhandler');

const secret = 'seusecretdetoken';

const erro401 = 401;

const errorName = {
  auth: 'missing auth token', 
  token: 'jwt malformed',
};

const auth = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    let decoded = '';
    if (!authorization) throw errorHandler(erro401, errorName.auth);
    jwt.verify(authorization, secret, (err, decode) => {
      if (err) throw errorHandler(erro401, errorName.token); 
      decoded = decode;    
    });  
    const { _id } = await findByCpf(decoded.data);
    req.userId = _id;  
    next();  
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
