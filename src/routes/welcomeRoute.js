import { Router } from 'express';
import code from '../helpers/statusCode';
import Response from '../helpers/sendResponse';

const router = Router();

router.get('/', (_req, res) => Response.success(res, code.ok, 'Welcome to Todo app'));

export default router;
