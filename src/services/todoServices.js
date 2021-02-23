import models from '../database/models';
import logger from '../config/logger';

const { Todo } = models;

/** Class representing a Todo services . */
class TodoService {
  /**
* @description this method adds a todo in a database
* @param {object} request contains valid request attributes
* @returns {object} returns a created todo
* @memberof TodoService
*/
  static async addTodo(request) {
    try {
      const created = await Todo.create(request);
      return created;
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }

  /**
* @description this method finds all todos from the database
* @param {param} param contains the condition to be checked against where
* @returns {object} returns all todos
* @memberof TodoService
*/
  static async findTodos(param) {
    try {
      const todos = await Todo.findAll({
        where: param,
      });
      return todos;
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }

  /**
* @description this method finds a single todo
* @param {param} param contains the condition to be checked against where
* @returns {object} returns single todo
* @memberof TripService
*/
  static async findTodo(param) {
    try {
      return Todo.findOne({
        where: param,
      });
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }

  /**
* @description this method deletes a comment
* @param {object} param is to be checked against where
* @returns {object} returns comment object
* @memberof CommentService
*/
  static async deleteTodo(param) {
    try {
      const deleted = await Todo.destroy({
        where: param,
      });
      return deleted;
    } catch (error) {
      logger.error(error.stack);
      return error;
    }
  }
}

export default TodoService;
