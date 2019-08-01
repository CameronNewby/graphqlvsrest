'use strict'

module.exports = create;

function create(app) {
  let db = app.services.db;

  return {
    setupRoutes
  };

function setupRoutes(router) {
    router.route('/user').get(getUser);
    router.route('/user/all').get(getAllUsers);
    router.route('/user/:name/posts').get(getUserPosts);
    router.route('/user/:name/followers').get(getUserFollowers);
    router.route('/user/create').post(createUser);

    return router;
  }

  function getUser(req, res) {
      let { name } = req.query;

      db.models.User.findOne({name: name}, function (err, doc) {
          if (err) {
              return res.status(400).send('Error was given when trying to fetch user with name' + name);
          }
          return res.json(doc);
      }).lean();
  }

  function getAllUsers(req, res) {
    db.models.User.find({}, function (err, docs) {
        if (err) {
            return res.status(400).send('Error was given when trying to fetch all users');
        }
        return res.json(docs);
    }).lean();
  }

  function getUserPosts(req, res) {
    let { name } = req.params;

    db.models.User.findOne({name: name}, function (err, doc) {
        if (err) {
            return res.status(400).send('Error was given when trying to fetch users post with name' + name);
        }
        return res.json(doc);
    }).lean().select('posts');
  }

  function getUserFollowers(req, res) {

  }

  function createUser(req, res) {
    let { user } = req.query;

    db.models.User.create(user, function (err, doc) {
        if (err) {
            return res.status(400).send('Error was given when trying to create new user.');
        }
        return res.json(doc);
    }).lean();
  }
}