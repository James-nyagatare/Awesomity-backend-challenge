import { Router } from 'express';
import TodoController from '../controllers/todoController';
import JoiValidator from '../middlewares/joiValidator';
import Auth from '../middlewares/auth';

const {
  todoValidator, todoIdValidator
} = JoiValidator;
const {
  create, getOne, getAll, update, deleteTodo
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
 *               description:
 *                 type: string
 *                 required: true
 *               priority:
 *                 type: string
 *                 required: true
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

router.post('/', userAuth, todoValidator, create);
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               priority:
 *                 type: string
 *                 required: true
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
router.patch('/:id', userAuth, todoIdValidator, todoValidator, update);

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
