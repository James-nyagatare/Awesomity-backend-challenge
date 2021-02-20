import { Router } from 'express';
import code from '../helpers/statusCode';
import Response from '../helpers/sendResponse';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - welcome
 *     name: Routes
 *     summary: Welcome route to the todo app
 *     consumes:
 *        - application/json
 *     responses:
 *          200:
 *                description: successfully reached to the app
 * */

router.get('/', (_req, res) => Response.success(res, code.ok, 'Welcome to Todo app'));

export default router;
