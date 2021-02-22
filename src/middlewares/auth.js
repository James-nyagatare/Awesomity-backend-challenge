import verifyToken from '../helpers/verifyToken';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';

/** Class representing user authentication */
export default class Auth {
  /**
   *reset password authentication
   * @param {Object} req used to provide user requests
   * @param {Object} res used to provide response to the user
   * @param {Object} next used to move to the next middleware
   * @return {object} object of payload or error
   */
  static userAuth(req, res, next) {
    const parsedToken = req.headers.authorization;
    if (!parsedToken) return Response.error(res, code.unauthorized, 'Access denied. no token provided');
    const userToken = parsedToken.split(' ')[1];
    verifyToken(userToken, req, res, next);
  }

  /**
   *reset password authentication
   * @param {req} req used to provide user requests
   * @param {res} res used to provide response to the user
   * @param {next} next used to move to the next middleware
   * @return {object} object of payload or error
   */
  static paramAuth(req, res, next) {
    const { token } = req.params;
    verifyToken(token, req, res, next);
  }
}
