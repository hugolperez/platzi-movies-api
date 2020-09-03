const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;

/* la functión notFoundHandler no recibe el next, 
y para que pueda funcionar lo más importante, es que
esto debe ir al final de las rutas. Es decir, que el
not found se ejecuta cuando ya pasó por todas las rutas
y no encontro nada.*/