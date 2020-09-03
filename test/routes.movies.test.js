const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

// Para hacer los test.
describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    // cada vez que llamemos la ruta, quien servirá de servicio es MoviesServiceMock
    // esto porque los servicios, manda a llamar al servidor completo y no queremos eso.
    '../services/movies': MoviesServiceMock
  });

  // cargamos el server y le indicamos la ruta.
  const request = testServer(route);

  describe('GET /movies', function() {
    //con done, indica cuando el test debe terminar.
    //debería responder con estatus 200
    it('should respond with status 200', function(done) {
      request.get('/api/movies').expect(200, done);
    });

    //test que responde el listado de películas
    //verifica que los datos los está devolviendo como debería ser, al hacer el request.
    it('should respond with the list of movies', function(done) {
      request.get('/api/movies').end((err, res)=> {
        //deepEqual es para comparar objetos.
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });

        done(); //indica que el test finaliza acá
      });
    });
  });
});