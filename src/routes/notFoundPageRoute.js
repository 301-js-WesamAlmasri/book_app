
//Get Controller
const { notFoundPageController } = require('../controllers/notFoundPageController');

module.exports = (router) => {
  router.get('*', notFoundPageController);
};
