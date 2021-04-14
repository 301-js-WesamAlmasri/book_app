// Application Dependencies
require('dotenv').config();
const express = require('express');
const router = express.Router();
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');
const bootstrap = require('./routes');
const { errorController } = require('./controllers/errorController');
const {client} = require('./helpers/pgClient');

/* ---------- Application Setups ---------- */

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(router);
router.use(express.static('./src/public'));
router.use(express.urlencoded({ extended: true }));
// Error handler middleware
app.use(errorController);

/* --------- Application start the server --------- */

// init the routes
bootstrap(app, router);

//Test Page (Home)
router.get("/test", (req, res, next) => {
  return res.send("Hello There");
});


function startServer() {
  client
    .connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
      });
    })
    .catch((e) => console.log(e));
}

module.exports = {
  client,
  startServer
};
