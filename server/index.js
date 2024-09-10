const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const config = require('../config');
const cors = require('cors');

// Middleware para parsing JSON
app.use(express.json());

app.use(cors());

// Rotas
app.use('/', userRoutes);

// Inicia o servidor
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
