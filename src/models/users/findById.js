const { connection } = require('../connection');

const findById = async (id) => {
  const conn = await connection();
  const user = await conn.collection('users').findOne({
    _id: id,
  });   
  return user;     
};

module.exports = findById;
