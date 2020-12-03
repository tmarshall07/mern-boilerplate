const mongoose = require('mongoose');

module.exports = (dbRoute) => {
  // Connect to the MongoDB database
  mongoose.connect(dbRoute, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('connected to the database');
  });

  // checks if connection with the database is successful
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
