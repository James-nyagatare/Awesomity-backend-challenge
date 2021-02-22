import swaggerUi from 'swagger-ui-express';
import swaggerJSDocs from 'swagger-jsdoc';
import { config } from 'dotenv';

config();

const backendUrl = process.env.BACKEND_URL;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo App',
      version: '1.0.0',
      description:
        'a To-Do API. The To-Do API should Create, Update, Read and Delete operations on a todo item.',
      contact: {
        name: 'Nyagatare James',
        email: 'nyagatarejames@gmail.com',
      },
    },
    servers: [
      {
        url: backendUrl,
      },
    ],
  },
  security: ['JWT'],
  apis: ['src/routes/*.js'],

};

const setUpSwaggerUi = (app) => {
  const specs = swaggerJSDocs(options);
  app.use(
    '/api/v1/documentation',
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
  return app;
};

export default setUpSwaggerUi;
