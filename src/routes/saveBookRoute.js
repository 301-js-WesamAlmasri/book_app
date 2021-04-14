//Get Controller
const { saveBookController } = require('../controllers/saveBookController');

module.exports = (router) => {
  router.post('/books', saveBookController);
};
