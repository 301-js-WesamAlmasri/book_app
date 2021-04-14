const { getDataFromAPI } = require('../helpers/superAgentClient');
const { Book } = require('../store');

//function to get books from API and render them
function getBooksFromApiController(req, res, next) {
  let keyword = req.body.keyword;
  let search_by = req.body.search_by;
  let url = `https://www.googleapis.com/books/v1/volumes?q=+${search_by}:${keyword}`;

  getDataFromAPI(url)
    .then((items) => {
      let result = items.slice(0, 10);
      let books = result.map((bookData) => new Book(bookData));
      res.render('pages/searches/show', { books: books });
    })
    .catch((e) => next(e));
}

module.exports = {
  getBooksFromApiController
};
