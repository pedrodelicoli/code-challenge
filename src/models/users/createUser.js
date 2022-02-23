const { connection } = require('../connection');

const createUser = async (user) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('users').insertOne(user);   
  return insertedId;     
};

module.exports = createUser;
