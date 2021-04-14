
//Get Controller
const { showBookDetailsController } = require('../controllers/showBookDetailsController');

module.exports = (router) => {
  router.get('/books/:id', showBookDetailsController);
};
