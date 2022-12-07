function authenticated(req, res, next) {
  if(req.session && req.session.currentUser) return next();
  res.redirect('/login');
}

function unauthenticated(req, res, next) {
  if(!req.session || !req.session.currentUser) return next();
  res.redirect('/');
}

module.exports = { authenticated, unauthenticated };
