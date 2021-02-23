import Response from '../helpers/sendResponse';
import UserService from '../services/userServices';
import code from '../helpers/statusCode';
import logger from '../config/logger';

/** Class representing user authentication */
class Checks {
  /**
     *reset password authentication
     * @param {Object} req used to provide user requests
     * @param {Object} res used to provide response to the user
     * @param {Object} next used to move to the next middleware
     * @return {object} object of payload or error
     */
  static async emailChecks(req, res, next) {
    try {
      const { email } = req.body;
      const user = await UserService.findUser({ email });
      if (!user) return Response.error(res, code.notFound, 'User not found');
      req.user = user;
      next();
    } catch (error) {
      logger.error(error.stack);
      return Response.error(res, code.serverError, 'Somethimg Went wrong!');
    }
  }

  /**
     *reset password authentication
     * @param {req} req used to provide user requests
     * @param {res} res used to provide response to the user
     * @param {next} next used to move to the next middleware
     * @return {object} object of payload or error
     */
  static async signupChecks(req, res, next) {
    const { email } = req.body;
    const userExist = await UserService.findUser({ email });
    if (userExist) return Response.error(res, code.conflict, 'User already exist');
    next();
  }
}

export default Checks;
