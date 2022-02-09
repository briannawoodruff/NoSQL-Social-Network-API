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
        // thoughts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Thought',
        //     },
        // ],
        // friends: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'User',
        //     },
        // ],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

// Create a virtual property `friendCount` that gets and sets the user's full name
// userSchema
//     .virtual('friendCount')
//     // Getter
//     .get(function () {
//         const friendCount = this.friends.reduce((counter, obj) => obj ? counter += 1 : counter, 0);
//         return `${friendCount}`;
//     })
//     // Setter to set the first and last name
//     .set(function (v) {
//         const friendCount = v
//         this.set(friendCount);
//     });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;