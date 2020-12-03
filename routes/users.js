const authController = require('../controllers/authController');

module.exports = ({ router, authRouter }, passport) => {
  // Gets a user if we're logged in
  authRouter.get('/user', authController.getUser);

  // Registers a user
  router.post('/register', authController.register);

  // Logs a user in
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/api/success',
      failureRedirect: '/api/error',
    }),
  );

  // Log user out
  router.get('/logout', authController.logout);

  // Callbacks for login success/error
  router.get('/success', authController.success);
  router.get('/error', authController.error);
};
