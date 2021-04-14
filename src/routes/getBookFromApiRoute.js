//Get Controller
const {
  getBooksFromApiController,
} = require('../controllers/getApiBooksController');

module.exports = (router) => {
  router.post('/searches', getBooksFromApiController);
};
