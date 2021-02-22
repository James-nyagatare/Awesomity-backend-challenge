import { Router } from 'express';
import UserController from '../controllers/userController';
import Auth from '../middlewares/auth';
import JoiValidator from '../middlewares/joiValidator';
import Checks from '../middlewares/checks';

const router = Router();
const {
  emailValidator,
  resetPassValidator,
  signinValidator,
  signupValidator
} = JoiValidator;
const { emailChecks, signupChecks } = Checks;

/**
 * @swagger
 * /users/signup:
 *    post:
 *     tags:
 *       - Users
 *     summary: Create a new user in the app
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *               lastName:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               confirmPassword:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       201:
 *             description: user successfully created.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */

router.post('/signup', signupValidator, signupChecks, UserController.signup);

/**
 * @swagger
 * /users/login:
 *    post:
 *     tags:
 *       - Users
 *     summary: sign in a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *            description: user successfully logged in.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */
router.post('/login', signinValidator, emailChecks, UserController.signin);

/**
 * @swagger
 * /users/verifyEmail/{token}:
 *   get:
 *     tags:
 *       - Users
 *     name: user
 *     summary: Verify email
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *             description: You have been verified.
 *       404:
 *             description: User does not exist.
 *       409:
 *             description: User is already verified.
 *       500:
 *             description: server error.
 * */

router.get('/verifyEmail/:token', Auth.paramAuth, UserController.verifyEmail);
/**
 * @swagger
 * /users/forgotPassword:
 *   post:
 *     tags:
 *       - Users
 *     name: user
 *     summary: send a reset link email
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Email successfully sent.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: User not found.
 *       500:
 *             description: server error.
 * */

router.post('/forgotPassword', emailValidator, emailChecks, UserController.forgotPassword);
/**
 * @swagger
 * /users/resetPassword/{token}:
 *   patch:
 *     tags:
 *       - Users
 *     name: user
 *     summary: Reset passsword
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *               confirmPassword:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Password successfully updated.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: User not found.
 *       500:
 *             description: server error.
 * */
router.patch('/resetPassword/:token', Auth.paramAuth, resetPassValidator, UserController.resetPassword);

export default router;
