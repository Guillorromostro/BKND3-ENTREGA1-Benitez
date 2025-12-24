const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routes/users.router');
const petsRouter = require('./routes/pets.router');
const mocksRouter = require('./routes/mocks.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos (página de prueba en /test.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/mocks', mocksRouter);

module.exports = app;
