const { saveBook } = require('../models/books')

//function to save book to database
function saveBookController(req, res, next) {
  let bookData = req.body;

  saveBook(bookData)
    .then((id) => {
      res.redirect(`/books/${id}`);
    })
    .catch((e) => next(e));
}

module.exports = {
  saveBookController,
};
