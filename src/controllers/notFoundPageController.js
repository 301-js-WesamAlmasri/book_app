// function to render not found page
function notFoundPageController(req, res, next) {
  res.render('pages/error', { context: 'Page Not Found' });
}

module.exports = {
  notFoundPageController,
};
