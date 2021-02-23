import models from '../database/models';
import logger from '../config/logger';

const { User } = models;
/** Class representing a User services . */
class UserService {
  /**
   * Get user by email if exists
   * @param {Object} user what to be updated
   * @param {string} param parameters to be checked against
   * @return {object} Oject of user
   */
  static async createUser(user) {
    try {
      const createduser = await User.create(user);
      return createduser;
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }

  /**
   * Get user by email if exists
   * @param {string} param parameter to be checked against
   * @return {object} Oject of user if found
   */
  static async findUser(param) {
    try {
      const user = await User.findOne({ where: param });
      return user ? user.get() : null;
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }

  /**
   * Get user by email if exists
   * @param {Object} user what to be updated
   * @param {string} param parameters to be checked against
   * @return {object} Oject of user
   */
  static async updateUser(user, param) {
    try {
      const updatedUser = await User.update(user, {
        where: [param]
      });
      return updatedUser;
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }
}

export default UserService;
