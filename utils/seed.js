const connection = require('../config/connection');
const { User, Thought } = require('../models');

// require functions from data.js
const { getRandomUsername, getRandomEmail, getRandomFriends, getRandomThought } = require('./data');

// if connection error
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
  
    const users = [];

    const thought = getRandomThought(10)
  
    for (let i = 0; i < 20; i++) {
      const username = getRandomUsername();
      const thoughts = getRandomThought(1);
  
      users.push({
        username,
        email: getRandomEmail(),
        thoughts,
        friends: getRandomFriends(2)
      });
    }
  
    // add users into collection
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thought)
  
    console.table(users);
    console.table(thought);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });

