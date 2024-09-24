const spendingRouter = require('./spending');
const sidesRouter = require('./user');
const authsRouter = require('./auth');


function route(app) {

  app.use('/spending', spendingRouter);
  app.use('/auth', authsRouter);
  app.use('/', sidesRouter);
}

module.exports = route;