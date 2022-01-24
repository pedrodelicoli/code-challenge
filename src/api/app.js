const express = require('express');
const { error } = require('../middlewares/error');
const router = require('../routes');

const app = express();
app.use(express.json());

app.use(router);
app.use(error);

module.exports = app;
