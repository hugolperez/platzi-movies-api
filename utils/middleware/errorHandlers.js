const boom = require('@hapi/boom');
const { config } = require('../../config');

//middleware de ayuda para agregar el stack o no.
function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

// 3er middleware. Llegaran errores que no son de tipo boom, por lo tanto los convertiremos.
function wrapErrors(err, req, res, next) {
  // sí el error no es boom.
  if(!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const { output: { statusCode, payload } } = err;

  res.status(statusCode); // ya no se asigna código debido a que viene de boom.
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler  
}