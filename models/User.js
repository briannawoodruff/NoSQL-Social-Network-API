const { Schema, model } = require('mongoose');

// email validation with regex
const validateEmail = (email) => {
    return String(email)
        .match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,9})$/);
};

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            max_length: 25,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'invalid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that gets friend count
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length
      });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;