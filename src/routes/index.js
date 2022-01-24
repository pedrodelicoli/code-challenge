const express = require('express');

const { insertOne, login, userDeposit, userBalance } = require('../controllers/usersController');
const { 
    createOne,    
} = require('../controllers/transfersController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/users', insertOne);
router.post('/login', login);
router.post('/deposit', userDeposit);
router.get('/balance', auth, userBalance);
router.post('/transfers', auth, createOne);


module.exports = router; 