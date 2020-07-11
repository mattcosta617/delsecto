const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/express-blog-12';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
  Ask: require('./Ask'),
  Language: require('./Language'),
  Question: require('./Question'),
  User: require('./User'),
};