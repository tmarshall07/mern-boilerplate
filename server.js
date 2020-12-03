require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');
const adminbroService = require('./services/adminbro');
const mongodbService = require('./services/mongodb');
const passportService = require('./services/passport');

const app = express();

// Set up adminbro
const { adminBro, adminBroRouter } = adminbroService.setup();

// Set up mongodb
const { dbRoute } = mongodbService.setup();

// Set up passport
passportService.initialize(passport);

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
passportService.setup(app, passport);

// Register all passport strategies
passportService.registerStrategies(passport);

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
