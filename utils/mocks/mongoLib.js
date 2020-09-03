const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require("./movies");

const getAllStub = sinon.stub();
// stubs permite inidcar la respuesta según sus argumentos
// cuando pase movies a mongo, deberá devolver los mocks de películas.
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ["Drama"] } };
// en este caso se filtran las peliculas con el query.
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};