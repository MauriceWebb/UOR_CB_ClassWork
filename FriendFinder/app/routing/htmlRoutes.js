var path = require('path');

module.exports = function(app) {
  // "/survey" responds with the survey.html file
  app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });

  // All other routes respond with the home.html file
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });
};