const helpers = require("../public/js/helpers");

function renderTemplate(res, template, data) {
  res.render('index.ejs', {template, data, helpers});
}

module.exports = { renderTemplate };
