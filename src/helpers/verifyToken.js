import jwt from 'jsonwebtoken';
import Response from './sendResponse';
import code from './statusCode';

const { JWT_KEY } = process.env;

const verifyToken = (token, req, res, next) => {
  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return Response.error(res, code.unauthorized, 'Invalid token.');
  }
};

export default verifyToken;
