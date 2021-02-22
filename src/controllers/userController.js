import bcrypt from 'bcrypt';
import Response from '../helpers/sendResponse';
import UserService from '../services/userServices';
import sendEmailToUser from '../helpers/mailer/sendMailer';
import actionsEnum from '../helpers/actions';
import code from '../helpers/statusCode';
import generateToken from '../helpers/generateToken';
import Password from '../helpers/generatePassword';

/** Class representing user controllers */
class UserController {
  /**
     * @description user signUp method
     * @param {object} req provides the requests from users to controllers
     * @param {object} res provides responses to the users
     * @returns {object} created user object
     * @memberof userController
     */
  static async signup(req, res) {
    try {
      const { password, email } = req.body;
      const newPassword = await Password.encryptPassword(password);
      req.body.password = newPassword;
      const createUser = await UserService.createUser(req.body);
      delete createUser.dataValues.password;
      await sendEmailToUser(email, actionsEnum.verifyEmail, createUser);
      return Response.success(res, code.created, 'User created successfully,Please check your email for verification link', {
        user: createUser
      });
    } catch (error) {
      return Response.error(res, code.serverError, 'Something went wrong while registering');
    }
  }

  /**
     * @description user login method
     * @param {object} req provides the requests from users to controllers
     * @param {object} res provides responses to the users
     * @returns {object} logged in user object
     * @memberof userController
     */
  static async signin(req, res) {
    try {
      const { isVerified } = req.user;
      const validPassword = await bcrypt.compare(req.body.password, req.user.password);
      if (!validPassword) return Response.error(res, code.unauthorized, 'Invalid email or password');
      if (!isVerified) return Response.error(res, code.unauthorized, 'Please check your email for the verification link');
      const token = generateToken(req.user);
      delete req.user.password;
      return Response.success(res, code.ok, 'User logged in successfully', {
        user: req.user, token
      });
    } catch (error) {
      return Response.error(res, code.serverError, 'Ooops something went wrong!');
    }
  }

  /**
 * @description Verify if the email exists
 * @param {Object} req provides the requests from users to controllers
 * @param {Object} res provides responses to the users
 * @return {object} Oject of data or error
 * @memberof userController
*/
  static async verifyEmail(req, res) {
    try {
      const { email } = req.user;
      const user = await UserService.findUser({ email });
      if (!user) return Response.error(res, code.notFound, 'User does not exist!');
      if (user.isVerified) return Response.error(res, code.conflict, 'User is already verified');
      await UserService.updateUser({ isVerified: true }, { email });
      return Response.success(res, code.ok, 'You have been verified!');
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * @description forgotPassword method
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
   * @memberof userController
  */
  static async forgotPassword(req, res) {
    try {
      await sendEmailToUser(req.user.email, actionsEnum.resetPassword, req.user);
      return Response.success(res, code.ok, 'email has been sent please change your password');
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * @description resetPassword method
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
   * @memberof userController
  */
  static async resetPassword(req, res) {
    try {
      const { email } = req.user;
      const { password } = req.body;
      const user = await UserService.findUser({ email });
      if (!user) return Response.error(res, code.notFound, 'User does no longer exists!');
      const newPassword = await Password.encryptPassword(password);
      await UserService.updateUser({ password: newPassword }, { email });
      const { firstName } = user;
      return Response.success(res, code.ok, `Hello ${firstName}, your password was successfully updated!`);
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }
}

export default UserController;
