
//Get Controller
const { deleteBookController } = require('../controllers/deleteBookController');

module.exports = (router) => {
  router.delete('/books/:id', deleteBookController);
};
