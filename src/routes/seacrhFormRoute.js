//Get Controller
const { searchFormController } = require('../controllers/searchFormController');

module.exports = (router) => {
  router.get('/searches/new', searchFormController);
};
