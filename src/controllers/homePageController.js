const { getAllBooks } = require('../models/books');

// Home page controller
function homePageController(req, res, next) {

    getAllBooks()
      .then((data) => {
        let [books, totalCount] = data;
        res.render('pages/index', { books: books, totalCount: totalCount });
      })
      .catch((e) => next(e));
  }
  
module.exports = {
  homePageController
};