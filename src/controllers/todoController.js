import { Op } from 'sequelize';
import path from 'path';
import TodoService from '../services/todoServices';
import code from '../helpers/statusCode';
import Response from '../helpers/sendResponse';
import toCSV from '../helpers/csv';

/** Class representing trip controller */
class TodoController {
  /**
   * @description this method creates a todo
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
   * @memberof TodoController
  */
  static async create(req, res) {
    try {
      const { title, description } = req.body;
      const { id } = req.user;
      const todoExists = await TodoService.findTodo({
        title, description, userId: id
      });
      if (todoExists) return Response.error(res, code.conflict, 'Todo already exists');
      const todo = await TodoService.addTodo({ ...req.body, userId: id });
      delete todo.dataValues.userId;
      return Response.success(res, code.created, 'You successfully created a todo', todo);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * @description this method gets all todos
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
   * @memberof TodoController
  */
  static async getAll(req, res) {
    try {
      const { id } = req.user;
      const todos = await TodoService.findTodos({ userId: id });
      if (!todos) return Response.error(res, code.notFound, 'You have no todo for now');
      todos.map((todo) => delete todo.dataValues.userId);
      return Response.success(res, code.ok, 'Successfully found all your todos', todos);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * @description this method gets a single todo
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
   * @memberof TodoController
  */
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoService.findTodo({ id, userId: req.user.id });
      if (!todo) return Response.error(res, code.notFound, 'Todo not found');
      delete todo.dataValues.userId;
      return Response.success(res, code.ok, 'Successfully retrieved the todo', todo);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * @description this method updates a single todo
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
   * @memberof TodoController
  */
  static async update(req, res) {
    try {
      const { id } = req.user;
      const todo = await TodoService.findTodo({ id: req.params.id, userId: id });
      if (!todo) return Response.error(res, code.notFound, 'Todo not found');
      todo.update(req.body);
      delete todo.dataValues.userId;
      return Response.success(res, code.ok, 'Successfully updated a todo', todo);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * @description this method deletes a Todo
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} no content
   * @memberof TodoController
   */
  static async deleteTodo(req, res) {
    try {
      const { id } = req.user;
      const deleteTodo = await TodoService.deleteTodo({ id: req.params.id, userId: id });
      if (!deleteTodo) return Response.error(res, code.notFound, 'Todo not found!');
      return Response.success(res, code.deleted);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * @description this method exports Todos
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} todo csv
   * @memberof TodoController
   */
  static async exportTodos(req, res) {
    try {
      const { id } = req.user;
      const param = req.query.q ? { userId: id, title: { [Op.iLike]: `%${req.query.q}%` } } : { userId: id };
      const todos = await TodoService.findTodos(param);
      toCSV(todos);
      return res.status(200).download(path.join(__dirname, '..', '..', 'Todos.csv'), 'Todos.csv');
    } catch (error) {
      return Response.error(res, code.serverError, 'something went wrong!');
    }
  }
}

export default TodoController;
