// random-email npm package
var randomEmail = require('random-email');

//  leveraged from 18-NoSQL/01-Activities/28-Stu_Mini_Project/Main/Utils/data.js
const names = [
    "Aaran",
    "Aaren",
    "Aarez",
    "Aarman",
    "Aaron",
    "Aaron-James",
    "Aarron",
    "Aaryan",
    "Aaryn",
    "Aayan",
    "Aazaan",
    "Abaan",
    "Abbas",
    "Abdallah",
    "Abdalroof",
    "Abdihakim",
    "Abdirahman",
    "Abdisalam",
    "Abdul",
    "Abdul-Aziz",
    "Abdulbasir",
    "Abdulkadir",
    "Abdulkarem",
    "Smith",
    "Jones",
    "Coollastname",
    "Ze",
    "Zechariah",
    "Zeek",
    "Zeeshan",
    "Zeid",
    "Zein",
    "Zen",
    "Zendel",
    "Zenith",
    "Zennon",
    "Zeph",
    "Zerah",
    "Zhen",
    "Zhi",
    "Zhong",
    "Zhuo",
    "Zi",
    "Zidane",
    "Zijie",
    "Zinedine",
    "Zion",
    "Zishan",
    "Ziya",
    "Ziyaan",
    "Zohaib",
    "Zohair",
    "Zoubaeir",
    "Zubair",
    "Zubayr",
    "Zuriel",
    "Xander",
    "Jared",
    "Courtney",
    "Gillian",
    "Clark",
    "Jared",
    "Grace",
    "Kelsey",
    "Tamar",
    "Alex",
    "Mark",
    "Tamar",
    "Farish",
    "Sarah",
    "Nathaniel",
    "Parker",
];

// Alan Watts Quotes: https://alanwatts.org/quotes/
const thoughtBodies = [
    "The more a thing tends to be permanent, the more it tends to be lifeless.",
    "Muddy water is best cleared by leaving it alone.",
    "No amount of anxiety makes any difference to anything that is going to happen.",
    "Thought is a means of concealing truth, despite the fact that it's an extraordinarily useful faculty.",
    "The only way to make sense of change is to plunge in and join the dance.",
    "This is the real secret of life— to be completely engaged with what you are doing in the here and now— and instead of calling it work, realize it is play.",
    "When you look out of your eyes, at nature happening out there, you're looking at you. That's the real you. The you that goes on of itself.",
    "Of course, you can't force your mind to be silent. That will be like trying to smooth ripples in water over the flat iron. Water becomes clear and calm only when left alone.",
    "Something and nothing are two sides of the same coin.  The positive and the negative; the something and the nothing go together.",
    "Your skin does not separate you from the world. It's a bridge through which the external world flows into you. And you flow into it.",
    "If we came to our senses, we would be aware of ourselves not as only on the inside of our skins… But we would be aware that the outside is us too.",
];

const possibleReactions = [
    "I disagree tbh",
    "I also think too much.",
    "Oh damn",
    "True and I hate it",
    "Existential crisis",
    "Too self aware.",
    "No, thanks.",
    "It's rought out here.",
    "Okay...",
    "Why though",
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random number for username
const getRandomNumber = () =>
    `${Math.floor(Math.random() * 100)}`;

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(names)}${getRandomArrItem(names)}${getRandomNumber()}`;

// Gets a random email
const getRandomEmail = () =>
    `${randomEmail()}`;

// Function to generate random thoughts to addto the database. Includes reactions.
// const getRandomThought = (int) => {
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       published: Math.random() < 0.5,
//       description: getRandomArrItem(descriptionsBodies),
//       advertiserFriendly: Math.random() < 0.5,
//       responses: [...getVideoResponses(3)],
//     });
//   }
//   return results;
// };

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomEmail };