const { getBookDetails } = require('../models/books');

// function to show book details
function showBookDetailsController(req, res, next) {
  let id = req.params.id;

  getBookDetails(id)
    .then((book) => {
      res.render('pages/books/detail', { book: book });
    })
    .catch((e) => next(e));
}

module.exports = {
  showBookDetailsController,
};
