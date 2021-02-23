import setUpSwaggerUi from '../config/swaggerDoc';
import welcomeRoute from './welcomeRoute';
import todoRoutes from './todoRoutes';
import userRoutes from './userRoutes';

const urlPreffix = '/api/v1';
/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

const routes = (app) => {
  app.use(welcomeRoute);
  app.use(`${urlPreffix}/todos`, todoRoutes);
  app.use(`${urlPreffix}/users`, userRoutes);
  setUpSwaggerUi(app);

  return app;
};
export default routes;
