// require express and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

// need for heroku deploy
const PORT = process.env.PORT || 3001;
const app = express();

// indicates what activity's server is running in the terminal
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// PORT
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
