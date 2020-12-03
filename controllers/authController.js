const User = require('../schemas/users');
const to = require('../lib/to');

exports.success = (req, res) => res.json({ user: { id: req.user.id } });

exports.error = (req, res) => res.json({ error: 'Invalid email or password.' });

exports.logout = (req, res) => {
  req.logout();
  return res.json({ success: true });
};

exports.getUser = async (req, res) => {
  return res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      name: req.user.name,
      avatar: req.user.avatar,
    },
  });
};

exports.register = async (req, res) => {
  const { email, name, password } = req.body;

  // Make sure we're checking / adding in lowercase
  const newEmail = email.toLowerCase();

  // Make sure user email does not already exist
  const [err, user] = await to(User.findOne({ email: newEmail }));
  if (err) return res.json({ error: err });
  if (user) return res.json({ error: 'Sorry, a user with that email already exists.', type: 'email' });

  // Create new user if user doesn't exist
  const newUser = new User({
    email: newEmail,
    name,
    password,
  });

  const [saveError] = await to(newUser.save());
  if (saveError) {
    if (saveError.errors.username) {
      return res.json({ error: saveError.errors.username.message });
    }

    if (saveError.errors.email) {
      return res.json({ error: 'Email validation failed' });
    }

    return res.json({ error: 'Sorry, something went wrong' });
  }

  // Automatically log in user
  req.login(newUser, (loginErr) => {
    if (loginErr) {
      return res.json({ error: 'Error logging in new user.' });
    }
    return res.redirect('/api/success');
  });
};
