const { connection } = require('./connection');

const createUser = async (user) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('users').insertOne(user);   
  return insertedId;     
};
const findByCpf = async (data) => {
  const conn = await connection();
  const user = await conn.collection('users').findOne({
    cpf: data,
  });   
  return user;     
};

const insertValue = async (id, value) => {
  const conn = await connection();
  const query = await conn.collection('users').updateOne(
    { _id: id },
    { $inc: { amount: parseFloat(value) } },
  );
  console.log(query)
  return query;
};

const findById = async (id) => {
  const conn = await connection();
  const user = await conn.collection('users').findOne({
    _id: id,
  });   
  return user;     
};

module.exports = { createUser, findByCpf, insertValue, findById };