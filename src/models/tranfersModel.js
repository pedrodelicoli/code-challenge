const { connection } = require('./connection');

const insertTransfer = async (transfer) => {
    const conn = await connection();
    const { insertedId } = await conn.collection('transfers').insertOne(transfer);   
    return insertedId;   
};

const findAll = async (id) => {
    const conn = await connection();
    const find = await conn.collection('transfers').find({ userId: id }).toArray(); 
    return find;   
};





module.exports = { insertTransfer, findAll };  