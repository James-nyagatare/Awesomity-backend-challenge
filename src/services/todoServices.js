import models from '../database/models';

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
      return await Todo.create(request);
    } catch (error) {
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
      return await Todo.findAll({
        where: param,
      });
    } catch (error) {
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
      return await Todo.destroy({
        where: param,
      });
    } catch (error) {
      return error;
    }
  }
}

export default TodoService;
