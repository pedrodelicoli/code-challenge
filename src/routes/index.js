const express = require('express');

const insertOne = require('../controllers/users/insertOne');
const login = require('../controllers/users/login');
const userDeposit = require('../controllers/users/userDeposit');
const userBalance = require('../controllers/users/userBalance');
const createOne = require('../controllers/transfers/createOne');
const listAll = require('../controllers/transfers/listAll');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/users', insertOne);
router.post('/login', login);
router.post('/deposit', userDeposit);
router.get('/balance', auth, userBalance);
router.get('/statement', auth, listAll);
router.post('/transfers', auth, createOne);


module.exports = router; 