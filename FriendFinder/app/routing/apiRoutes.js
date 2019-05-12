var friends = require('../data/friends');

module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var newFriend = req.body;
    friends.push(newFriend);

    res.json(newFriend);
  });

  app.delete('/api/friends/:id', function(req, res) {
    friends = friends.filter(function(friend) {
      return friend.id !== req.params.id;
    });

    res.end();
  });
};
