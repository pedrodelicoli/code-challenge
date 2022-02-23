const findById = require('../../models/users/findById');

const findUser = async (id) => {
    const user = await findById(id);
    return user;
  };
    
module.exports = findUser;