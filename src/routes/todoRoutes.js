import { Router } from 'express';
import TodoController from '../controllers/todoController';
import JoiValidator from '../middlewares/joiValidator';
import Auth from '../middlewares/auth';

const {
  todoCreateValidator, todoIdValidator, todoUpdateValidator, queryValidator
} = JoiValidator;
const {
  create, getOne, getAll, update, deleteTodo, exportTodos, deleteTodos, changeStatus
} = TodoController;

const { userAuth } = Auth;

const router = Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Creates a todo
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *                 example: Moving trashes out.
 *               description:
 *                 type: string
 *                 required: true
 *                 example: Moving the living room trashes out.
 *               priority:
 *                 type: string
 *                 required: true
 *                 example: HIGH
 *
 *     responses:
 *       201:
 *             description: Todo successfully Created.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: Todo already exists.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */

router.post('/', userAuth, todoCreateValidator, create);
/**
 * @swagger
 * /todos:
 *   get:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Get all todos
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *             description: Successfully found all todos.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.get('/', userAuth, getAll);
/**
 * @swagger
 * /todos/export:
 *   get:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     name: export
 *     summary: Exports todos/ todo
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: q
 *         in: query
 *         example: Moving
 *     responses:
 *       200:
 *             description: notification sucessfuly read.
 *       401:
 *             description: unauthorized.
 *       500:
 *             description: server error.
 * */
router.get('/export', userAuth, queryValidator, exportTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: retrieve single todo
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *             description: Successfully found the todo.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.get('/:id', userAuth, todoIdValidator, getOne);
/**
 * @swagger
 * /todos/status:
 *   patch:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Updates a todo
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: string
 *                 example: true
 *
 *     responses:
 *       200:
 *             description: Todo successfully Created.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: Todo already exists.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.patch('/status', userAuth, todoUpdateValidator, changeStatus);
/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: Updates a todo
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Reading books
 *               description:
 *                 type: string
 *                 example: Reading novels and summarizing them
 *               priority:
 *                 type: string
 *                 Example: LOW
 *
 *     responses:
 *       200:
 *             description: Todo successfully Created.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: Todo already exists.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.patch('/:id', userAuth, todoIdValidator, todoUpdateValidator, update);
/**
 * @swagger
 * /todos:
 *   delete:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: deletes a todo
 *     consumes:
 *       - application/json
 *     responses:
 *       204:
 *             description: Successfully deleted a todo.
 *       401:
 *             description: Unauthorized
 *       404:
 *            description: not found
 *       500:
 *             description: server error.
 * */
router.delete('/', userAuth, deleteTodos);
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     summary: deletes a todo
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         example: 1
 *     responses:
 *       204:
 *             description: Successfully deleted a todo.
 *       401:
 *             description: Unauthorized
 *       404:
 *            description: not found
 *       500:
 *             description: server error.
 * */
router.delete('/:id', userAuth, todoIdValidator, deleteTodo);

export default router;
