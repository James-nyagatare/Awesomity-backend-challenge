import Response from './sendResponse';
import code from './statusCode';

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
