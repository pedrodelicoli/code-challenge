const app = require('./app');
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
