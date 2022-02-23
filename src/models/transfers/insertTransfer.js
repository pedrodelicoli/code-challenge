const { connection } = require('../connection');

const insertTransfer = async (transfer) => {
    const conn = await connection();
    const { insertedId } = await conn.collection('transfers').insertOne(transfer);   
    return insertedId;   
};

module.exports = insertTransfer;  
