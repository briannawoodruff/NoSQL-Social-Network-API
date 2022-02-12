const User = require('../models/User');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find({})
    .then(users => res.json(users))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
  // get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { users: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user by id
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'User deleted, but no thoughts found!' })
          : res.json({ message: 'User successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new friend
  createFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { friends: req.body } },
        { runValidators: true, new: true })
        .then(users => {
            if (!users) {
                res.status(404).json({ message: 'No user with this ID.' });
                return;
            }
            res.json(users);
        })
        .catch(err => res.status(400).json(err))
},
// delete friend
deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { friends: req.body.friendId } },
        { new: true }
    )
        .then(users => {
            if (!users) {
                res.status(404).json({ message: 'That did not work!' });
                return;
            }
            res.json(users);
        })
        .catch(err => res.json(err));
}
};