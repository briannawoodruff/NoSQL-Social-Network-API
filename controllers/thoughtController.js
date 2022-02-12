const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            //   .populate({path: 'username', select: '-__v'})
            //   .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    // get a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // update a thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'Thought deleted, but no user found!' })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { reactions: req.body } },
            { runValidators: true, new: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID.' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(400).json(err))
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: { reactions: req.body } },
          { new: true }
        )
          .then(thoughts => {
            if (!thoughts) {
              res.status(404).json({ message: 'That did not work!'});
              return;
            }
           res.json(thoughts);
          })
          .catch(err => res.json(err));
      }
};