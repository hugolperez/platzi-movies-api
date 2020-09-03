// assert nos permite verificar sí el test es correcto o no.
const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

// con .only, ejecuta este único test.
describe.only('utils - buildMessage', function() {
  describe('when receives an entity and an action', function() {
    it('should return the respective message', function() {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when ceives an entity and an action and is a list', function() {
    it('should return the respective message with the entity in plural', function() {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    });
  });
});