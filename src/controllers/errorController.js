// function to render the error page
function errorController(err, req, res, next) {
  console.error(err.stack);
  res.render('pages/error');
}

module.exports = {
  errorController,
};
