require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const MongoStore = require('connect-mongo')(session);

const registerStrategies = require('./services/registerStrategies');
const setupAdminBro = require('./services/setupAdminBro');
const routes = require('./routes');
const setupMongodb = require('./services/setupMongodb');
const setupPassport = require('./services/setupPassport');

const app = express();

// Set up adminbro
const { adminBro, adminBroRouter } = setupAdminBro();

// Set up mongodb
const { dbRoute } = setupMongodb();

// Set up passport
setupPassport(passport);

// Use adminbro
app.use(adminBro.options.rootPath, adminBroRouter);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Enable CORS - TODO: Should probably add whitelist to this
app.use(cors());

// Enable sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      url: dbRoute,
    }),
  }),
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Register all passport strategies
registerStrategies(passport);

// Use static build dir if in production
if (process.env.NODE_ENV === 'production') {
  // if (process.env.NODE_ENV === 'dev') {
  app.use(express.static(path.join(__dirname, './client/build')));
}

// Include routes
routes(app, passport);

app.listen(process.env.PORT, () => {
  console.log(`ChowMeow app listening at http://localhost:${process.env.PORT}`);
});
