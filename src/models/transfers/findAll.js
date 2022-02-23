const { connection } = require('../connection');

const findAll = async (id) => {
    const conn = await connection();
    const find = await conn.collection('transfers').find({ userId: id }).toArray(); 
    return find;   
};

module.exports = findAll;
