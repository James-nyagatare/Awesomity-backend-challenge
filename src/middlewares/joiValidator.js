import Joi from 'joi';
import joiResponse from '../helpers/joiResponse';
/** Class representing joi validation . */
export default class JoiValidator {
/**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static todoValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(2).required(),
      description: Joi.string().min(10).required(),
      priority: Joi.valid('LOW', 'MEDIUM', 'HIGH').required(),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static todoIdValidator(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().min(1).required(),
    });
    joiResponse(req.params, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static signupValidator(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().required().regex(/^[a-z ,.'-]+$/i),
      lastName: Joi.string().required().regex(/^[a-z ,.'-]+$/i),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8).label('Password'),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required()
        .options({ messages: { 'any.only': 'Passwords does not match' } }),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static signinValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static emailValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static resetPassValidator(req, res, next) {
    const schema = Joi.object({
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required()
        .options({ messages: { 'any.only': 'Passwords does not match' } }),
    });
    joiResponse(req.body, res, schema, next);
  }
}
