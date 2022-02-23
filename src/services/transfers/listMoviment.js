const findAll = require('../../models/transfers/findAll');

const listMoviment = async (id) => {
    const statement = await findAll(id);
    return statement;
};

module.exports = listMoviment;  