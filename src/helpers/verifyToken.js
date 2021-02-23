import jwt from 'jsonwebtoken';
import logger from '../config/logger';
import Response from './sendResponse';
import code from './statusCode';

const { JWT_KEY } = process.env;

/**
* @description This method verifies the token parsed in by user
* @param {object} token token
* @param {object} req req
* @param {object} res schema to follow
* @param {object} next next
* @returns {object} payload or error
*/
const verifyToken = (token, req, res, next) => {
  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    logger.error(error.stack);
    return Response.error(res, code.unauthorized, 'Invalid token.');
  }
};

export default verifyToken;
