const express = require('express');
const path = require('path');

const isAuthenticated = require('../middleware/isAuthenticated');

module.exports = (app, passport) => {
  // Router that's unprotected
  const router = express.Router();
  // Router that requires authentication via login
  const authRouter = express.Router();

  // Create routers
  const routers = {
    router,
    authRouter,
  };

  // Require other routes here...
  require('./users')(routers, passport);

  // Append /api for our http requests
  app.use('/api', router);
  app.use('/api', isAuthenticated, authRouter);

  app.use('/', router);

  // Serve client build directory for all requests if we're live
  if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
      // Use build folder at /client/build
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }
};
