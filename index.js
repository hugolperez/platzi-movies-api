const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');

const { 
  logErrors, wrapErrors, errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// middleware body parser
app.use(express.json());
app.use(helmet());

// routes
authApi(app);
moviesApi(app); // Las rutas también son middleware. Los middlware error van despueste de las rutas.
userMoviesApi(app);

// Catch 404
app.use(notFoundHandler);

//Errores middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});