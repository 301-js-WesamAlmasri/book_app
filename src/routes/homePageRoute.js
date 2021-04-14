//Get Controller
const { homePageController } = require('../controllers/homePageController');

module.exports = (router) => {
  router.get('/', homePageController);
};
