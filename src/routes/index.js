
const newsRouter = require('./news');
const sidesRouter = require('./site');

function route(app){

    app.use('/news', newsRouter);

    app.use('/', sidesRouter);
      
      app.get('/news', (req, res) => {
        res.render('news');
      })


}

module.exports = route;