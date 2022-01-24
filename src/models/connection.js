const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017/BankTrade';
const DB_NAME = 'BankTrade';

let db = null;

const connection = () => {
    try { 
      return db
        ? Promise.resolve(db)
        : MongoClient.connect(MONGO_DB_URL, OPTIONS)
           .then((conn) => {
             db = conn.db(DB_NAME);
             return db;
           });
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }   
};

module.exports = { connection };