import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${__dirname}/../../logs/todo-app-info.log`,
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

export default logger;
