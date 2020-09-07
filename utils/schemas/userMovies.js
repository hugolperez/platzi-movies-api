const joi = require('@hapi/joi');

const { movieIdSchema } = require('./movies');
const { userIdSchema } = require('./users');

const UserMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema
};

module.exports = {
  UserMovieIdSchema,
  createUserMovieSchema
}