const connection = require('../config/connection');
const { User } = require('../models');

// require functions from data.js
const { getRandomUsername, getRandomEmail } = require('./data');

// if connection error
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
  
    const users = [];
  
    for (let i = 0; i < 20; i++) {
      const username = getRandomUsername();
  
      users.push({
        username,
        email: getRandomEmail(),
      });
    }
  
    await User.collection.insertMany(users);
  
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });

