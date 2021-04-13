// Application Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require( 'path' );
const superagent = require('superagent');
const { Client } = require('pg');
const { Book } = require('./store');

/* ---------- Application Setups ---------- */

//init pg clinet
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DEV_MODE ? false : { rejectUnauthorized: false },
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.set( 'views', path.join( __dirname, '/views' ) );
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

/* ---------- Application Routes ---------- */
app.get('/hello', handleTest);

app.get('/', handleHomePage);

app.get('/searches/new', handleSearchNew);
app.post('/searches', handlePostSearch);

app.post('/books', handleSaveBook);

app.get('/books/:id', handleBookDetail);

// Page Not Found
app.get('*', handlePageNotFound);

// Error handler midlware
app.use(errorPage);

/* --------- Application routes handlers ---------- */

// Home page routes
function handleHomePage(req, res, next) {

  getAllBooks()
    .then((data) => {
      let [books, totalCount] = data;
      res.render('pages/index', { books: books, totalCount: totalCount });
    })
    .catch((e) => next(e));
}

// Test routes
function handleTest(req, res, next) {
  res.render('pages/index');
}

//function to render the search form
function handleSearchNew(req, res, next) {
  res.render('pages/searches/new');
}

//function to render the search form
function handlePostSearch(req, res, next) {
  let keyword = req.body.keyword;
  let search_by = req.body.search_by;
  getBooksFromApi(keyword, search_by)
    .then((books) => {
      res.render('pages/searches/show', { books: books });
    })
    .catch((e) => next(e));
}

//function to save book to databes
function handleSaveBook(req, res, next) {
    let bookData = req.body;

    saveBook(bookData)
        .then(id => {
            res.redirect(`/books/${id}`);
        })
        .catch(e => next(e));
  }

// function to render book details
function handleBookDetail(req, res, next) {
    let id = req.params.id;
    
    getBookDetail(id)
        .then(book => {
            res.render('pages/books/detail', {book: book});
        })
        .then(e => next(e));
}

function handlePageNotFound(req, res, next) {
  res.render('pages/error', { context: 'Page Not Found' });
}

/* Error handlers */

// function to render the error page
function errorPage(err, req, res, next) {
  console.error(err.stack);
  res.render('pages/error');
}

/* SQL queries callback functions */

// function to get all books from database
function getAllBooks() {
    let sqlQuery = 'SELECT * FROM books';

    let result = client
        .query(sqlQuery)
        .then((data) => {
        let books = data.rows;
        let totalCount = data.rowCount;
        return [books, totalCount];
        })
        .catch((e) => {throw new Error(e)});
    
        return result;
}

// function to save book to datbase
function saveBook(bookData) {
    let sqlQuery = 'INSERT INTO books (auther, title, isbn, book_shelf, image_url, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    let safeValues = [bookData.auther, bookData.title, bookData.isbn, bookData.book_shelf, bookData.image_url, bookData.description];

    let id = client.query(sqlQuery, safeValues)
        .then(data => {
            return data.rows[0].id;
        })
        .catch(e => {throw new Error(e)});
    
    return id;
}

// function to get book details from database
function getBookDetail(id) {
    
    let sqlQuery = 'SELECT * FROM books WHERE id=$1';
    let book = client.query(sqlQuery, [id])
        .then(data => {
            return data.rows[0];
        })
        .catch(e => {throw new Error(e)});

    return book;
}

// function to search books from API
function getBooksFromApi(keyword, search_by) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=+${search_by}:${keyword}`;
  let result =  superagent
    .get(url)
    .then((response) => {
      let result = response.body.items.slice(0, 10);
      let books = result.map((bookData) => new Book(bookData));
      return books;
    })
    .catch((e) => {throw new Error(e)});

    return result;
}

/* --------- Application start the server --------- */

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch((e) => console.log(e));
