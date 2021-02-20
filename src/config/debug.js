import debug from 'debug';
const log = {
  app: debug('app:app'),
  pg: debug('app:pg'),
  authCont: debug('app:authcontroller'),
  todosCont: debug('app:todoscontroller'),
  error: debug('app:error'),
};
export default log;