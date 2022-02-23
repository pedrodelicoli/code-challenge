const { connection } = require('../connection');

const findByCpf = async (data) => {
  const conn = await connection();
  const user = await conn.collection('users').findOne({
    cpf: data,
  });   
  return user;     
};

module.exports = findByCpf;