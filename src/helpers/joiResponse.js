import Response from './sendResponse';
import code from './statusCode';

/**
* @description This method validates user parsed data
* @param {object} toBeValidated object parsed in by user
* @param {object} res res
* @param {object} schema schema to follow
* @param {object} next next
* @returns {object} data
*/
const joiResponse = (toBeValidated, res, schema, next) => {
  const { error } = schema.validate(toBeValidated);
  if (error) {
    return Response.error(
      res,
      code.badRequest,
      error.details[0].message.replace(/\"/g, '')
    );
  }
  next();
};
export default joiResponse;
