import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const { JWT_KEY } = process.env;
/**
* @description This method generates the token
* @param {object} data object of data
* @returns {object} data
*/
const generateToken = (data) => {
  const token = jwt.sign({
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    isVerified: data.isVerified
  }, JWT_KEY);
  return token;
};
export default generateToken;
