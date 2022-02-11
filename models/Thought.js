const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// date format
var { format_date } = require('../utils/dateFormat')

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        // required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    username: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    ],
    reactions: [Reaction],
  },
  {
    // timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;