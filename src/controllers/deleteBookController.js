const { deleteBook } = require('../models/books');

// function to handle delete book details
function deleteBookController(req, res, next) {
  let id = req.params.id;

  deleteBook(id)
    .then(() => res.redirect(`/`))
    .catch((e) => next(e));
}

module.exports = {
  deleteBookController,
};
