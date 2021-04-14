const { dbExcecute } = require('../helpers/pgClient');

// function to get all books from database
function getAllBooks() {
  let sqlQuery = 'SELECT * FROM books';

  let result = dbExcecute(sqlQuery)
    .then((books) => {
      return [books, books.length];
    })
    .catch((e) => {
      throw new Error(e);
    });

  return result;
}

// function to save book to datbase
function saveBook(bookData) {
  let sqlQuery =
    'INSERT INTO books (auther, title, isbn, book_shelf, image_url, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  let safeValues = [
    bookData.auther,
    bookData.title,
    bookData.isbn,
    bookData.book_shelf,
    bookData.image_url,
    bookData.description,
  ];

  let id = dbExcecute(sqlQuery, safeValues)
    .then((data) => {
      return data[0].id;
    })
    .catch((e) => {
      throw new Error(e);
    });

  return id;
}

// function to get book details from database
function getBookDetails(id) {
  let sqlQuery = 'SELECT * FROM books WHERE id=$1';

  let book = dbExcecute(sqlQuery, [id])
    .then((book) => {
      return book[0];
    })
    .catch((e) => {
      throw new Error(e);
    });

  return book;
}

// function to update book details from database
function updateBookDetails(id, data) {
  let { auther, title, isbn, book_shelf, image_url, description } = data;
  let sqlQuery =
    'UPDATE books SET auther=$1, title=$2, isbn=$3, book_shelf=$4, image_url=$5, description=$6 WHERE id=$7';
  let values = [auther, title, isbn, book_shelf, image_url, description, id];

  let book = dbExcecute(sqlQuery, values)
    .then((data) => {
      return data[0];
    })
    .catch((e) => {
      throw new Error(e);
    });

  return book;
}

// function to delete book from database
function deleteBook(id) {
  let sqlQuery = 'DELETE FROM books WHERE id=$1';

  let book = dbExcecute(sqlQuery, [id])
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });

  return book;
}

module.exports = {
  getAllBooks,
  saveBook,
  getBookDetails,
  updateBookDetails,
  deleteBook,
};
