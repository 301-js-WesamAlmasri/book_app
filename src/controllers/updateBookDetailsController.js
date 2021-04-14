const { updateBookDetails } = require('../models/books');

// function to update book details
function updateBookDetailsController(req, res, next) {
  let id = req.params.id;
  let data = req.body;
  
  updateBookDetails(id, data)
    .then(() => res.redirect(`/books/${id}`))
    .catch((e) => next(e));
}

module.exports = {
    updateBookDetailsController,
};
