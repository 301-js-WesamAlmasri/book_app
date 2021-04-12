// Application Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Application Setups
const PORT = process.env.PORT || 3000;
const app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));


// Application Routes
app.get('/hello', handleTest);


// Application routes handlers
function handleTest(req, res) {
    res.render('pages/index', {'name': 'Wesam Al-Masri'})
}

//Application start the server

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

