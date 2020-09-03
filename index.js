const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const { 
  logErrors, wrapErrors, errorHandler
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// middleware body parser
app.use(express.json());

// routes
moviesApi(app); // Las rutas también son middleware. Los middlware error van despueste de las rutas.

// Catch 404
app.use(notFoundHandler);

//Errores middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});