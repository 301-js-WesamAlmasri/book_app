//function to render the search form
function searchFormController(req, res, next) {
  res.render('pages/searches/new');
}

module.exports = {
  searchFormController,
};
