const mongoose = require('mongoose');

// Name of the database and live mongo atlas db
const DATABASE_NAME = 'mydatabase';
const MONGO_ATLAS_URL = 'cluster0-eyqdb.mongodb.net';

exports.setup = () => {
  // MongoDB route
  const dbRoute =
    process.env.NODE_ENV === 'dev'
      ? `mongodb://localhost:27017/${DATABASE_NAME}`
      : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${MONGO_ATLAS_URL}/${DATABASE_NAME}`;

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

  return { dbRoute };
};
