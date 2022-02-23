const { connection } = require('../connection');

const insertValue = async (id, value) => {
  const conn = await connection();
  const query = await conn.collection('users').updateOne(
    { _id: id },
    { $inc: { amount: parseFloat(value) } },
  );
  return query;
};

module.exports = insertValue;
