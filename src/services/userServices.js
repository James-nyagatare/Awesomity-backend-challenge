import models from '../database/models';

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
    const createduser = await User.create(user);
    return createduser;
  }

  /**
   * Get user by email if exists
   * @param {string} param parameter to be checked against
   * @return {object} Oject of user if found
   */
  static async findUser(param) {
    const user = await User.findOne({ where: param });
    return user ? user.get() : null;
  }

  /**
   * Get user by email if exists
   * @param {Object} user what to be updated
   * @param {string} param parameters to be checked against
   * @return {object} Oject of user
   */
  static async updateUser(user, param) {
    const updatedUser = await User.update(user, {
      where: [param]
    });
    return updatedUser;
  }
}

export default UserService;
