import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import routes from './routes';
import db from './database/models/index';
import log from './config/debug';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

routes(app);

app.use('/*', (_req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

const port = process.env.PORT || 4000;
const { sequelize, dbUrl } = db;
sequelize.authenticate()
  .then(() => {
    log.pg('Database connected...', dbUrl);
    app.listen(port, log.app(`Listening on port ${port}...`));
  })
  .catch((err) => log.error(`Error: ${err}`));

export default app;
