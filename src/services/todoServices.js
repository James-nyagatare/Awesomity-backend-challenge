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
    const created = await Todo.create(request);
    return created;
  }

  /**
* @description this method finds all todos from the database
* @param {param} param contains the condition to be checked against where
* @returns {object} returns all todos
* @memberof TodoService
*/
  static async findTodos(param) {
    const todos = await Todo.findAll({
      where: param,
    });
    return todos;
  }

  /**
* @description this method finds a single todo
* @param {param} param contains the condition to be checked against where
* @returns {object} returns single todo
* @memberof TripService
*/
  static async findTodo(param) {
    return Todo.findOne({
      where: param,
    });
  }

  /**
* @description this method deletes a comment
* @param {object} param is to be checked against where
* @returns {object} returns comment object
* @memberof CommentService
*/
  static async deleteTodo(param) {
    const deleted = await Todo.destroy({
      where: param,
    });
    return deleted;
  }

  /**
* @description this method updates todos
* @param {object} todo the todos or todo to be updated
* @param {object} param is to be checked against where
* @returns {object} returns comment object
* @memberof CommentService
*/
  static async updateTodo(todo, param) {
    const updated = await Todo.update(todo, {
      where: [param]
    });
    return updated;
  }
}

export default TodoService;
