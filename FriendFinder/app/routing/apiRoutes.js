var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // app.get('/api/friends/:name', function(req, res) {
  //   res.json(friends.filter((name) => {
  //     return (name.name === req.params.name)? true : false;
  //   }));
  // });

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;

    // get best match...
    let match = {
      index: 0,
      least_difference: 0
    };

    friends.forEach((friend, i) => {
      let difference = 0;
      friend.scores.forEach((score, j) => {
        difference += Math.abs(newFriend.scores[j] - score);
      });
      if (i === 0) {
        match.index = i;
        match.least_difference = difference;
      } else if (difference < match.least_difference) {
        match.index = i;
        match.least_difference = difference;
      } else return;
    });

    best_match = friends[match.index];

    friends.push(newFriend);
    res.json(best_match);
  });
};
