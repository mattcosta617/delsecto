const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI('mongodb://localhost:27017/delsecto');




mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
  Solution: require('./Solution'),
  Language: require('./Language'),
  Question: require('./Question'),
  User: require('./User'),
};


// mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );