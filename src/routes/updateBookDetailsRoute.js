
//Get Controller
const { updateBookDetailsController } = require('../controllers/updateBookDetailsController');

module.exports = (router) => {
  router.put('/books/:id', updateBookDetailsController);
};
