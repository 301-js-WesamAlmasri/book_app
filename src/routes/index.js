const homePageRoute = require('./homePageRoute');
const getBookFromApiRoute = require('./getBookFromApiRoute');
const seacrhFormRoute = require('./seacrhFormRoute');
const saveBookRoute = require('./saveBookRoute');
const showBookDetailsRoute = require('./showBookDetailsRoute');
const updateBookDetailsRoute = require('./updateBookDetailsRoute');
const deleteBookRoute = require('./deleteBookRoute');
const notFoundPageRoute = require('./notFoundPageRoute');

//Default function that will bootstrap the routes and link it with controllers
module.exports = (app, router) => {
  //Initialize Routes
  homePageRoute(router);
  getBookFromApiRoute(router);
  seacrhFormRoute(router);
  saveBookRoute(router);
  showBookDetailsRoute(router);
  updateBookDetailsRoute(router);
  deleteBookRoute(router);
  notFoundPageRoute(router);
};
