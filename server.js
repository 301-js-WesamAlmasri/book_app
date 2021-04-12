// Application Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const {Book} = require('./store')

/* ---------- Application Setups ---------- */
const PORT = process.env.PORT || 3000;
const app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));


/* ---------- Application Routes ---------- */
app.get('/hello', handleTest);

app.get('/searches/new', handleSearchNew);
app.post('/searches', handlePostSearch);

// Error handler midlware
app.use(errorPage);



/* --------- Application routes handlers ---------- */

// Test routes
function handleTest(req, res, next) {
    res.render('pages/index', {'name': 'Wesam Al-Masri'})
}

//routes to render the search form
function handleSearchNew(req, res, next) {
    res.render('pages/searches/new');
}

//routes to render the search form
function handlePostSearch(req, res, next) {
    let keyword = req.body.keyword
    let search_by = req.body.search_by;
    let url = `https://www.googleapis.com/books/v1/volumes?q=+${search_by}:${keyword}`;
    superagent.get(url)
        .then(response => {
            let result = response.body.items.slice(0, 10);
            let formattedResutl = result.map(bookData => new Book(bookData));
            res.render('pages/searches/show', {books: formattedResutl});
        })
        .catch(e => {throw Error('Cannot get data from the API')})
}

/* Error handlers */

// function to render the error page
function errorPage(err, req, res, next) {
    res.render('pages/error');
}

/* --------- Application start the server --------- */

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

