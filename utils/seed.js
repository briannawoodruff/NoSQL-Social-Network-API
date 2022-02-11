const connection = require('../config/connection');
const { User, Thought } = require('../models');

// require functions from data.js
const { getRandomUsername, getRandomEmail, getRandomThought, genRandomIndex } = require('./data');

// if connection error
connection.on('error', (err) => err);

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Empty arrays for randomly generated users and thoughts
  const users = [];
  const thoughts = [];

  // Function to make a thought object and push it into the thoughts array
  const makeThought = (thoughtText) => {
    thoughts.push({
      thoughtText,
      username: users[genRandomIndex(users)]._id,
    });
  };

  // Function to generate 2 friends
  const addFriends = (person) => {
      const friendArr = person.friends

      const friendID = users.map(friend => friend._id)
      const oneID = friendID[Math.floor(Math.random() * friendID.length)];
    
      friendArr.push(oneID)
      friendArr.push(oneID)
  };

  // Create 20 random users and push them into the users array
  for (let i = 0; i < 20; i++) {
    const username = getRandomUsername();
    
    users.push({
      username,
      email: getRandomEmail(),
      thoughts: [],
      friends: [],
    });
  }

  // Wait for the users to be inserted into the database
  User.collection.insertMany(users);
  
  // For each of the users that exist, make 1 random thought and add friends
  users.forEach((friend) => {
    makeThought(getRandomThought(1));
    addFriends(friend);
  });
  
  // Wait for the thoughts array to be inserted into the database
  await Thought.collection.insertMany(thoughts);

  // Log out a table for users and posts
  console.table(users);
  console.table(thoughts, ['thoughtText', 'username', '_id']);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
